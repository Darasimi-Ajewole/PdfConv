#!/bin/bash

deploy_cloud_run(){
  cd app
  gcloud builds submit --tag gcr.io/$GCP_PROJECT/pdf-conv:latest &&
  gcloud run deploy default \
    --image gcr.io/$GCP_PROJECT/pdf-conv:latest \
    --region=us-central1 \
    --service-account $CLOUD_RUN_ACCOUNT \
    --allow-unauthenticated \

}

deploy_asset(){
  cd assets
  yarn install &&
  yarn build && 
  cp -r build ../firebase
  cd '../firebase'
  firebase deploy
}

terminate(){
    echo 'Stopping and Removing all Running Deployment.....'
    kill -HUP -$$
}

trap terminate SIGINT EXIT

echo 'Deploying Project....' 

deploy_cloud_run &
deploy_asset &
wait
