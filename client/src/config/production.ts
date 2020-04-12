import Router from '../core/Routing'
import IKeyValuePair from '../core/types/IKeyValuePair'

import routes from './routes'

const config: IKeyValuePair = {
    environment: 'production',
    router: new Router(), // optional; if router is not provided a new Router() will be created by Application
    routes: [ ...routes ], // optional; a set of routes in a format which is understandable by the router
}

export default config
