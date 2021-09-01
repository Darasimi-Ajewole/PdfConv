#!/bin/bash

deploy_cloud_run(){
  cd app
  gcloud builds submit --tag gcr.io/open-source-320820/pdf-conv:latest &&
  gcloud run deploy default \
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

echo 'Deploying Project....' 

deploy_cloud_run &
deploy_asset &
wait
