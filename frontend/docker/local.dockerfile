# Build server image:
#     docker build -t site-image --file ./frontend/docker/local.dockerfile .
# Run server:
#     docker run -d --name site -v $PWD:/srv/site -v $PWD/frontend/src/lib/jsapp:/srv/site/frontend/src/lib/jsapp -p 8080:80 site-image
# Install node modules:
#     docker exec site npm install
# Run TS Lint:
#     docker exec site npm run lint
# Build frontend
#     docker exec site npm run build

FROM node:alpine

LABEL maintainer "smith404@live.com"

RUN apk update && \
    apk add nginx && \
    mkdir -p /srv/site

WORKDIR /srv/site

COPY frontend/docker/default.conf /etc/nginx/conf.d/default.conf

CMD ["sh", "/srv/site/frontend/docker/local-start.sh"]
