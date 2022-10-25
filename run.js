#!/usr/bin/env node

const puppeteer = require('puppeteer');
const utils = require('./utils');

(async function() {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-features=site-per-process',

            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    });

    console.log(process.argv);
    var targetUsername = process.argv[2]; //0 index

    var frontdoor = null;
    if (targetUsername)
        frontdoor = await utils.runSFDXCommand(`sfdx force:org:open -u ${targetUsername} -r --json`);
    else
        frontdoor = await utils.runSFDXCommand(`sfdx force:org:open -r --json`);

    console.log(frontdoor.result.url);

    var urlData = frontdoor.result.url;
    var scubbedUrl = urlData.replace("https://", "");
    var parsedUrl = scubbedUrl.split('/');
    var fqdn = parsedUrl[0];
    var parsedFqdn = fqdn.split('.');


    const timeout = 60000;
    const page = await browser.newPage();
    page.setDefaultTimeout(240000);
    await page.goto(`${frontdoor.result.url}`);

    await utils.sleep(10000);

    // await page.waitFor(10000);
    //go to /lightning/setup/OmniStudioSettings/home
    var targetOSSettings = `https://${parsedFqdn[0]}.scratch.lightning.force.com/lightning/setup/OmniStudioSettings/home`;
    console.log(targetOSSettings)

    await Promise.all([
        page.waitForNavigation({ timeout: timeout, waitUntil: 'load' }),
        page.waitForNavigation({ timeout: timeout, waitUntil: 'networkidle2' }),
        page.goto(targetOSSettings)
    ]);

    await page.setViewport({ width: 1200, height: 837 });
    await utils.sleep(60000);

    //OmniStudio Runtime
    try {
        await page.evaluateHandle(
            () => document.querySelectorAll('runtime_omnistudio-pref-toggle')[0].shadowRoot.querySelector('lightning-input').shadowRoot.querySelector('input').click()
        );

    } catch (error) {
        console.log(error);
    }

    await utils.sleep(60000);

    //Standard OmniStudio
    try {
        await page.evaluateHandle(
            () => document.querySelectorAll('runtime_omnistudio-pref-toggle')[1].shadowRoot.querySelector('lightning-input').shadowRoot.querySelector('input').click()
        );

    } catch (error) {
        console.log(error);
    }

    await utils.sleep(60000);

    //Standard OmniStudio
    try {
        await page.evaluateHandle(
            () => document.querySelectorAll('runtime_omnistudio-pref-toggle')[2].shadowRoot.querySelector('lightning-input').shadowRoot.querySelector('input').click()
        );

    } catch (error) {
        console.log(error);
    }

    await browser.close();
})();