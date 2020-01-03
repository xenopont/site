import { Route } from '../core/Routing'

const routes: Route[] = [
    new Route('/', () => { console.log('Home Page') }), // tslint:disable-line:no-console
]

export default routes
