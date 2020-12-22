FROM node:15.4.0-alpine3.12

LABEL maintainer="smith404@live.com"

RUN apk update && \
    apk add nginx && \
    # add lscpu command required by parcel to detect the amount of CPU threads
    apk add util-linux && \
    mkdir -p /srv/site

WORKDIR /srv/client

COPY ./docker/dev-client.nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/dev-client.start.sh /tmp/start.sh

ENV ENV="/root/.ashrc"
ENV NODE_ENV="development"

CMD ["ash", "/tmp/start.sh"]
