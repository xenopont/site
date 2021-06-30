import { defaultAction } from './types/Action'
import Action from './types/Action'
import IRouter from './types/IRouter'

/**
 * signature of route matching function
 */
type RouteMatchFunction = (uri: string) => boolean

/**
 * DTO to keep routes
 */
class Route { // tslint:disable-line:max-classes-per-file
    public action: Action = defaultAction
    public matchFunction: RouteMatchFunction | null = null
    public regexp: RegExp | null = null
    public uri: string | null = null

    constructor(path: RouteMatchFunction | RegExp | string, action: Action) {
        this.action = action

        if (path instanceof RegExp) {
            this.regexp = path
        }
        else if (typeof path === 'string') {
            this.uri = path
        }
        else { // type of path is RouteMatchFunction
            this.matchFunction = path
        }
    }
}

class Router implements IRouter { // tslint:disable-line:max-classes-per-file
    protected routes: Route[] = []

    public constructor(routes?: Route[]) {
        if (routes) {
            this.setRoutes(routes)
        }
    }

    public setRoutes(routes: Route[]): void {
        this.routes = routes
    }

    public addRoute(route: Route): this {
        this.routes.push(route)

        return this
    }

    public resolve(pathname: string): Action | null {
        const foundRoute: Route | undefined = this.routes.find((route) => this.routeMatch(route, pathname))
        if (foundRoute) {
            return foundRoute.action
        }

        return null
    }

    protected routeMatch(route: Route, pathname: string) {
        if (route.uri === pathname) {
            return true
        }
        else if (route.regexp !== null && pathname.match(route.regexp)) {
            return true
        }
        else if (route.matchFunction !== null && route.matchFunction(pathname)) {
            return true
        }

        return false
    }
}

export default Router
export { Route }
