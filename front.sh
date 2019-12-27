#!/usr/bin/env bash

docker build -t front-image --file ./client/docker/front-dev.dockerfile .
docker run --rm -d --name front -v ${PWD}:/srv/site -p 8081:80 front-image
echo
echo
echo
echo "Starting frontend server..."
echo
echo
echo
docker exec -it front ash
echo "Stopping frontend server..."
docker stop front
echo "Done."
