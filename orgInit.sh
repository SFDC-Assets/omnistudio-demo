#!/usr/bin/env bash

#create scratch org
sf demoutil org create scratch -f config/project-scratch-def.json -d 30 -s -p omni -e studio.demo

#install OmniStudio - 246.14
# Packages here: https://help.salesforce.com/s/articleView?id=sf.os_install_or_upgrade_the_omnistudio_package.htm&type=5
sf package install -p 04t4W000003ChfP --wait 20 -r
sf package install -p 04tHn000001dvY4 --wait 30
sf package install -p 04t1E000001Iql5 --wait 2
sf demoutil user password set -p salesforce1 -g User -l User
sf org assign permset -n FinancialServicesCloudStandard
sf org assign permset -n FinancialServicesCloudExtension

#Sample metadata examples into the org - basic hello world.
sf project deploy start -d omnideploy
sf project deploy start -c -g

#open says me.
sf org open
