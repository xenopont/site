# Build server image:
#     docker build -t site-image --file ./frontend/docker/local.dockerfile .
# Run server:
#     docker run -d --name site -v $PWD:/srv/source -p 8080:80 site-image
# Copy files to the working dir:
#     docker exec site cp -R /srv/source/* /srv/site
# Install node modules:
#     docker exec site npm install
# Run TS Lint:
#     docker exec site npm run lint

FROM node:alpine

LABEL maintainer "smith404@live.com"

VOLUME /srv/source

RUN apk update && \
    apk add nginx && \
    mkdir -p /srv/site

WORKDIR /srv/site

COPY frontend/docker/default.conf /etc/nginx/conf.d/default.conf

CMD ["sh", "/srv/source/frontend/docker/local-start.sh"]
