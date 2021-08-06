#!/bin/sh
if [ $# -lt 1 ]
then
    echo "Usage: $0 tag"
    echo "tag may be      any tag string beginning with a letter."
    exit 1
fi

docker build -t hobby/api:$1 -f Dockerfile .
