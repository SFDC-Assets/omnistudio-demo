#!/usr/bin/env bash

#create scratch org
sfdx force:org:create -s -f config/project-scratch-def.json -d 30 -s -w 60

#install OmniStudio - 238
sfdx force:package:install --package=04t1E00000127We --wait 15
sfdx force:package:install --package=04t1E000001Iql5 --wait 2
sfdx force:package:install -p 04t4W000002ke26QAA -w 45 -r 

#push the utility metadata service class
sfdx force:source:deploy -m ApexClass:MetadataService

#set the remote sites
sfdx force:apex:execute -f dparemoteSites.cls

#Puppeteer to set OmniStudio Metadata to TRUE via UI  and enable the  standard runtime
# node run.js
# sleep 120

#Sample metadata examples into the org - basic hello world.
# sfdx force:source:deploy -m OmniUiCard,OmniScript,OmniIntegrationProcedure,OmniDataTransform
sfdx force:source:push -f

#open says me.
sfdx force:org:open
