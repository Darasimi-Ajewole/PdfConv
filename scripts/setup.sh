#!/bin/bash

setup_asset() {
  cd assets
  yarn install
}
setup_cloud_run() {
  cd app
  python3 -m venv venv && source venv/bin/activate &&
  pip install --upgrade-strategy=only-if-needed -r requirements.txt
  docker-compose build
}


setup_asset &
setup_cloud_run &

wait