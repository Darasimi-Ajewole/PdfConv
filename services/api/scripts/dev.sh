#!/bin/sh
if [ $# -lt 1 ]
then
    echo "Usage: $0 tag"
    echo "tag may be      any tag string beginning with a letter."
    exit 1
fi

docker run -it -p 8080:8080 \
    --read-only \
    --name api-container \
    --mount type=bind,src="$(pwd)",dst=/app \
    hobby/api:$1