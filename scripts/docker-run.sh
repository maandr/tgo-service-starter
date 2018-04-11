#!/usr/bin/env bash

if [ -z "$VERSION" ]; then
    VERSION=$(node -e "console.log(require('./package.json').version)")
fi

if [ -z "$NAME" ]; then
    NAME=$(node -e "console.log(require('./package.json').name.split('/').pop())")
fi

if [ -z "$CONTAINER_NAME" ]; then
    CONTAINER_NAME=$(node -e "console.log(require('./package.json')['docker-container-name'] || '')")
fi

if [ -z "$CONTAINER_NAME" ]; then
    echo "docker-remove requires docker-container-name in package.json"
    exit 1
fi

if [ "$#" -ne 0 ]; then
    DOCKER_ARGS=$@
	echo docker run --name "$CONTAINER_NAME" "$DOCKER_ARGS" "$NAME:$VERSION"
    docker run --name "$CONTAINER_NAME" $DOCKER_ARGS "$NAME:$VERSION"
else
    echo docker run --name "$CONTAINER_NAME" "$NAME:$VERSION"
    docker run --name "$CONTAINER_NAME" "$NAME:$VERSION"
fi