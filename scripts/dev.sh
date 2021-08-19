#!/bin/bash

terminate(){
    echo 'Stopping and Removing all Containers.....'
    docker-compose down
}

trap terminate SIGINT EXIT

export GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token)

docker-compose up