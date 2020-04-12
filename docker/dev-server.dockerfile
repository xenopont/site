FROM node:alpine

LABEL maintainer="smith404@live.com"

RUN apk update

WORKDIR /srv/server

COPY ./docker/dev-server.start.sh /tmp/start.sh

ENV ENV="/root/.ashrc"
ENV NODE_ENV="development"

CMD ["ash", "/tmp/start.sh"]
