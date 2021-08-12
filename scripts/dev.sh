#!/bin/bash

terminate(){
    echo 'Stopping and Removing all Containers.....'
    docker stop pdf-converter && docker rm pdf-converter
}

trap terminate SIGINT EXIT

export GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token)

docker-compose up --build