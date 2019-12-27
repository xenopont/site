import IUrlResolver from './interfaces/IUrlResolver'
import RouteMethod from './interfaces/RouteMethod'

/**
 * signature of route matching function
 */
type RouteMatchFunction = (uri: string) => boolean

/**
 * internal class to keep routes
 */
class Route { // tslint:disable-line:max-classes-per-file
    public callback: RouteMethod | null = null
    public matchFunction: RouteMatchFunction | null = null
    public regexp: RegExp | null = null
    public uri: string | null = null
}

export { RouteMatchFunction }
export default class Router implements IUrlResolver { // tslint:disable-line:max-classes-per-file
    protected routes: Route[] = []

    public addRoute(path: string|RegExp|RouteMatchFunction, callback: RouteMethod) {
        const newRoute: Route = new Route()
        newRoute.callback = callback
        if (path instanceof RegExp) {
            newRoute.regexp = path
        }
        else if (typeof path === 'function') {
            newRoute.matchFunction = path
        }
        else { // typeof path === 'string'
            newRoute.uri = path
        }
        this.routes.push(newRoute)
        return this
    }

    public resolve(uri: string): RouteMethod | null {
        const foundRoute = this.routes.find((route) => this.routeMatch(route, uri))
        if (foundRoute) {
            return foundRoute.callback
        }
        return null
    }

    protected routeMatch(route: Route, uri: string) {
        if (route.uri === uri) {
            return true
        }
        else if (route.regexp !== null && uri.match(route.regexp)) {
            return true
        }
        else if (route.matchFunction !== null && route.matchFunction(uri)) {
            return true
        }
        return false
    }
}
