#!/bin/bash

terminate(){
    echo 'Stopping and Removing all Running Containers/Process.....'
    docker-compose down && kill -HUP -$$
}

trap terminate SIGINT EXIT

docker-compose up &

ln -f .env assets/.env

cd assets

export REACT_APP_ENVIRONMENT='development'
yarn start &

wait