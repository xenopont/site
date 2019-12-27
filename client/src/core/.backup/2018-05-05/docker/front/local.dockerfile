# build the image:      docker build -t jsapp --file ./docker/front/local.dockerfile .
# install dependencies: docker run --rm -v ${PWD}:/srv/jsapp jsapp npm install
# start the server:     docker run -d --name jsapp-server -p 8081:80 -v ${PWD}:/srv/jsapp jsapp
# start watching:       docker exec jsapp-server npm run watch
# build the app:        docker exec jsapp-server npm run build
# eslint:               docker exec jsapp-server npm run eslint

FROM nginx

LABEL maintainer "smith404@live.com"

VOLUME /srv/jsapp
WORKDIR /srv/jsapp

RUN apt-get update && \
    apt-get -y install curl && \
    apt-get -y install git && \
    apt-get -y install gnupg && \
    curl -sL https://deb.nodesource.com/setup_9.x | bash && \
    apt-get install -y nodejs && \
    npm -g install npm@latest

COPY docker/front/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
