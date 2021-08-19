#!/bin/bash

if [[ $DEBUG == 1 ]]; then
echo "Setting GOOGLE_APPLICATION_CREDENTIALS"
export GOOGLE_APPLICATION_CREDENTIALS="service_account/open-source-320820-b7123898a659.json"
fi


python3 main.py