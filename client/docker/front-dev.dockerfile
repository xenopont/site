FROM node:alpine

LABEL maintainer="smith404@live.com"

RUN apk update && \
    apk add nginx && \
    # add lscpu command required by parcel to detect the amount of CPU threads
    apk add util-linux && \
    mkdir -p /srv/site

WORKDIR /srv/site/client

COPY client/docker/front-dev-default.conf /etc/nginx/conf.d/default.conf

ENV ENV="/root/.ashrc"
ENV NODE_ENV="development"

CMD ["sh", "/srv/site/client/docker/front-dev-start.sh"]
