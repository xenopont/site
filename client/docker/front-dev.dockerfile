# Build server image:
#     docker build -t front-image --file ./client/docker/front-dev.dockerfile .
# Run server:
#     docker run -d --name front -v ${PWD}:/srv/site -p 8081:80 front-image
# Install node modules:
#     docker exec front npm install
# Run TS Lint:
#     docker exec front npm run lint
# Build frontend
#     docker exec front npm run build

FROM node:alpine

LABEL maintainer="smith404@live.com"

ENV ENV="/root/.ashrc"

RUN apk update && \
    apk add nginx && \
    mkdir -p /srv/site

WORKDIR /srv/site/client

COPY client/docker/front-dev-default.conf /etc/nginx/conf.d/default.conf

CMD ["sh", "/srv/site/client/docker/front-dev-start.sh"]
