import { IRoute, route } from '../core/routing/DefaultRouter'
import { defaultAction } from '../core/routing/RouteAction'

export const routes: IRoute[] = [
    route('/', defaultAction),
]
