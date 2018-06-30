# Build server image:
#     docker build -t site-image --file ./frontend/docker/local.dockerfile .
# Install node modules:
#     docker run --rm -v $PWD:/srv/site site-image npm install
# Install node modules on shared cifs on from windows:
#     docker run --rm -v $PWD:/srv/site site-image npm install --no-bin-links
# Run TS Lint:
#     docker run --rm -v $PWD:/srv/site site-image npm run lint
# Run server:
#     docker run --rm -v $PWD:/srv/site -p 8080:80 site-image

FROM node:alpine

LABEL maintainer "smith404@live.com"

VOLUME /srv/site
WORKDIR /srv/site

RUN apk update && \
    apk add nginx

COPY frontend/docker/default.conf /etc/nginx/conf.d/default.conf
COPY frontend/docker/local-start.sh /tmp/start.sh

CMD ["sh", "/tmp/start.sh"]
