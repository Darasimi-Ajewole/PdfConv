#!/bin/bash

terminate(){
    echo 'Stopping and Removing all Running Containers/Process.....'
    docker-compose down && kill -HUP -$$
}

trap terminate SIGINT EXIT

docker-compose up &

cd assets

yarn start &

wait