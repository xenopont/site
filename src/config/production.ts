import { routes } from './routes'
import { DefaultRouter } from '../core/routing/DefaultRouter';

const environments = {
    dev: 'development',
    prod: 'production',
}

const config = {
    apiRoot: 'define me',
    currentEnvironment: environments.prod,
    environments,
    router: DefaultRouter, // optional; if router is not provided the DefaultRouter will be used by Application
    routes: [ ...routes ], // optional; a set of routes in a format which is understandable by the router
}

export default config
