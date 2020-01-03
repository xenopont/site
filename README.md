# Readme

## Configuring Client
`client/src/config/app.production.ts` is the main app configuration.

The app imports a configuration from `./config/app.ts`, that shall be created as a symlink by the starting script of the current environment: a production builder would point this address to `app.production.ts` itself, while a development/test builder should point it to `app.dev.ts`, where the production config is imported, modified accordingly to the environment and re-exported again for the application. This allows to hide the dev/test environment configs from the production builds and avoid exposing private values to the world wide clients.

### Example:
**app.production.ts**
```ts
import IKeyValuePair from '../core/types/IKeyValuePair'

const config: IKeyValuePair = {
    environment: 'production',
}

export default config
```

**app.dev.ts**
```ts
import IKeyValuePair from '../core/types/IKeyValuePair'
import config from './app.production'

const devConfig: IKeyValuePair = { ...config }

devConfig.environment = 'development'

export default devConfig
```

Here, if a proper symlink was created and the app imports its config as `import appConfig from './config/app.ts'`, it will see `appConfig.environment` as `development`.

Whenever you modify the symlink being already inside the docker environment (do not do that), you need to remove the parcel cache folder at `/client/.cache` and rebuild the frontend again.

## Routing
For the default `Router`, there must be a `routes: Route[]` field in the application configuration object. Every `Route` provides and `Action` method to be executed on match and one of the following: either a `string` to be strictly equal to the `path`, or a `RegExp`, or a `RouteMatchFunction` to be tested against the `path`.

The `Router` will resolve the `window.location.pathname` into an `Action` method using that array of `Route`s and execute the method. Note, that neither the web page origin (`https://domain.name.com:445/`), nor `GET` parameters affect the `Router`'s resolution. Although, the `GET` parameters will be sent to the `Action` method later on.

### Custom Router
In order to use a custom router to resolve the paths, its instance shall be provided in a `router` property of the application configuration object:
```ts
const config: IKeyValuePair = {
    // ...
    router: new MyCustomRouter()
}  
```
The custom router _must_ implement the `IUrlResolver` interface.

If the custom router implements the `IRouter` interface too, and the `routes` property provided in the application configuration, the routes will be applied to the custom router. Otherwise, it is a developer's responsibility to make sure the custom router resolves the paths as desired.

Please, be aware that even if proper types were mentioned all around the routing, it is still technically possible to inject unexpected types of routes into the router configuration. Therefore, either the router must check the existence of all members it wants to use in path resolving, or the developer must make sure all the routes are configured properly.
