#!/bin/bash

deploy_cloud_run(){
  cd app
  gcloud builds submit --project=open-source-320820 --tag gcr.io/open-source-320820/pdf-conv:latest &&
  gcloud run deploy default \
    --project=open-source-320820 \
    --image gcr.io/open-source-320820/pdf-conv:latest \
    --region=us-central1 \
    --service-account pdfconv@open-source-320820.iam.gserviceaccount.com \
    --allow-unauthenticated \

}

deploy_asset(){
  cd assets
  yarn build && cp -r build ../firebase
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
