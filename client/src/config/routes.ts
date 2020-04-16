import { Route } from '../core/Routing'

import home from '../pages/home'

const routes: Route[] = [
    new Route('/', home), // tslint:disable-line:no-console
]

export default routes
