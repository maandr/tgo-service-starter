#!/usr/bin/env bash

if [ -z "$CONTAINER_NAME" ]; then
    CONTAINER_NAME=$(node -e "console.log(require('./package.json')['docker-container-name'] || '')")
fi

if [ -z "$CONTAINER_NAME" ]; then
    echo "docker-remove requires docker-container-name in package.json"
    exit 1
fi


if [ "$#" -ne 0 ]; then
    DOCKER_ARGS=$@
	echo docker rm $DOCKER_ARGS "$CONTAINER_NAME"
    docker rm $DOCKER_ARGS "$CONTAINER_NAME"
else
    echo docker rm "$CONTAINER_NAME"
    docker rm "$CONTAINER_NAME"
fi