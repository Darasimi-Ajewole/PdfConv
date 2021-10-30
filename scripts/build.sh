#!/bin/bash

build_app(){
  cd app
  gcloud builds submit --tag gcr.io/$GCP_PROJECT/pdf-conv:latest

}

build_asset(){
  cd assets
  yarn install &&
  yarn build && 
  cp -r build ../firebase
}

if [ $# -lt 2 ]
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
        echo "Usage: $0 assets|app"
        exit 1 ;;
esac