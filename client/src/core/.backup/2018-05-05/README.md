# JS App

## Frontend App

### Run In Docker
`cd` to the application root directory

Build the image:
```shell
docker build -t jsapp --file ./docker/front/local.dockerfile .
```

Install dependencies:
```shell
docker run --rm -v ${PWD}:/srv/jsapp jsapp npm install
```

Start the server:
```shell
docker run -d --name jsapp-server -p 8081:80 -v ${PWD}:/srv/jsapp jsapp
```

Start watching:
```shell
docker exec jsapp-server npm run watch
```

Or rebuild the app manually:
```shell
docker exec jsapp-server npm run build
```

Run eslint:
```shell
docker exec jsapp-server npm run eslint
```
