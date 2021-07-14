import { IUrlResolver } from './IUrlResolver'
import { IRouteStorage } from './IRouteStorage'
import { RouteAction } from './RouteAction'

export type RouteMatchFunction = (uri: string) => boolean;

export interface IRoute {
    action: RouteAction,

    uri: string | null,
    regexp: RegExp | null,
    matchFunction: RouteMatchFunction | null,
}

export const route = (path: string | RegExp | RouteMatchFunction, action: RouteAction): IRoute => {
    const newRoute: IRoute = {
        action,
        uri: null,
        regexp: null,
        matchFunction: null,
    }

    if (path instanceof RegExp) {
        newRoute.regexp = path
    }
    else if (typeof(path) === 'string') {
        newRoute.uri = path
    }
    else {
        newRoute.matchFunction = path
    }

    return newRoute
}

const routeMatches = (route: IRoute, path: string): boolean => {
    if (route.uri === path) {
        return true
    }
    else if (route.regexp !== null && path.match(route.regexp)) {
        return true
    }
    else if (route.matchFunction !== null && route.matchFunction(path)) {
        return true
    }

    return false
}

let RouteStorage: IRoute[] = []

const DefaultRouter: IUrlResolver & IRouteStorage = {
    // IUrlResolver
    resolve: (pathname: string): RouteAction | null => {
        const foundRoute: IRoute | undefined = RouteStorage.find((route) => routeMatches(route, pathname))
        if (foundRoute) {
            return foundRoute.action
        }

        return null
    },

    // IRouteStorage
    addRoute: (route: IRoute): IRouteStorage => {
        RouteStorage.push(route)

        return DefaultRouter
    },
    setRoutes: (routes: IRoute[]): void => {
        RouteStorage = routes
    },
}

export { DefaultRouter }
