# Build server image:
# docker build -t front-image --file ./frontend/docker/local.dockerfile .
# Run server:
# docker run -d --name front -p 8080:80 -v $PWD:/srv/site front-image

FROM nginx:alpine

LABEL maintainer "smith404@live.com"

VOLUME /srv/site
WORKDIR /srv/site

RUN apk update && \
    apk add bash && \
    apk add sudo && \
    sudo apk add nodejs

COPY frontend/docker/default.conf /etc/nginx/conf.d/default.conf
