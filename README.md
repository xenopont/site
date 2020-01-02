# readme

##configuring client
`client/src/config/app.production.ts` is the main app configuration.

The app imports a configuration from `./config/app.ts`, that shall be created as a symlink by the starting script of the current environment: a production builder would point this address to `app.production.ts` itself, while a development/test builder should point it to `app.dev.ts`, where the production config is imported, modified accordingly to the environment and re-exported again for the application. This allows to hide the dev/test environment configs from the production builds and avoid exposing private values to the world wide clients.

###example:
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
