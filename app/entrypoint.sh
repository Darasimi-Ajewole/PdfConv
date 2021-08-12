#!/bin/bash

if [[ $DEBUG == 1 ]]; then
echo "Setting GOOGLE_APPLICATION_CREDENTIALS"
export GOOGLE_APPLICATION_CREDENTIALS="open-source-320820-1013ab77048c.json"
fi


python3 main.py