#!/bin/bash

deploy_cloud_run(){
  cd app
  gcloud builds submit --tag gcr.io/$GCP_PROJECT/pdf-conv:latest &&

}

deploy_asset(){
  cd assets
  yarn install &&
  yarn build && 
  cp -r build ../firebase
}


trap terminate SIGINT EXIT

echo 'Deploying Project....' 

deploy_cloud_run &
deploy_asset &
wait
