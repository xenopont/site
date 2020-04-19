import Router from '../core/Routing'
import IKeyValuePair from '../core/types/IKeyValuePair'

import routes from './routes'

const environments = {
    dev: 'development',
    prod: 'production',
}

const config: IKeyValuePair = {
    apiHost: 'define me',
    currentEnvironment: environments.prod,
    environments,
    router: new Router(), // optional; if router is not provided a new Router() will be created by Application
    routes: [ ...routes ], // optional; a set of routes in a format which is understandable by the router
}

export default config
