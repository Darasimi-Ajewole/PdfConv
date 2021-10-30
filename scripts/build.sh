#!/bin/bash

build_app(){
  cd app
  gcloud builds submit --tag gcr.io/$GCP_PROJECT/pdf-conv:latest
  mkdir -p service_account
  echo $FIREBASE_KEY >> ./service_account/pdf-conv-3d1f5-firebase-adminsdk-iiadp-232350456b.json
}

build_asset(){
  cd assets
  yarn install &&
  yarn build && 
  cp -r build ../firebase
}
if [ $# -lt 1 ]
then
    echo "Usage: $0 assets|app"
    exit 1
fi

case $1 in
    assets)
        build_asset ;;
    app)
        build_app ;;
    *)
        echo "Invalid arg $1"
        exit 1 ;;
esac