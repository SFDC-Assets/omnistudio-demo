#!/usr/bin/env bash

#create scratch org
sfdx shane:org:create -f config/project-scratch-def.json -d 30 -s --wait 60 --userprefix omni -o studio.demo

#install OmniStudio - 246.14
sfdx force:package:install --package=04t4W0000038bMv --wait 20 -r
sfdx force:package:install --package=04tHn000001dvY4 --wait 30
sfdx force:package:install --package=04t1E000001Iql5 --wait 2
sfdx shane:user:password:set -p salesforce1 -g User -l User
sfdx force:user:permset:assign -n FinancialServicesCloudStandard
sfdx force:user:permset:assign -n FinancialServicesCloudExtension

#Sample metadata examples into the org - basic hello world.
sfdx force:source:deploy -p omnideploy
sfdx force:source:deploy -p force-app

#open says me.
sfdx force:org:open
