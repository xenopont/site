const arrays = require('./arrays')

let currentRoutes = []
/**
 * Appends an array of routes to the current ones
 * 
 * @param {Object|Object[]} routes 
 */
const useRoutes = function (routes) {
    currentRoutes = currentRoutes.concat(arrays.ensureArray(routes))
}

/**
 * Creates a Route Object
 * Syntax Sugar
 * 
 * @param {string|RegExp|function} path
 *     - string:   URI exactly equals to the path parameter
 *     - RegExp:   URI matches the regular expression
 *     - function: matching function accepts URI as a paramether and returns boolean
 * @param {function} callback any executable corresponding to the URI
 * @returns {Object}
 */
const createRoute = function (path, callback) {
    return {
        matchFunction: typeof path === 'function' ? path : null,
        callback: callback,
        regexp: path.constructor === RegExp ? path : null,
        stringUri: typeof path === 'string' ? path : null,
    }
}

/**
 * Checks if the Route Object matches the URI
 * 
 * @param {Object} route
 * @param {string} uri
 * @returns boolean
 */
const routeMatch = function (route, uri) {
    if (route.stringUri === uri) {
        return true
    }
    if (route.regexp !== null && uri.match(route.regexp)) {
        return true
    }
    if (route.matchFunction !== null && route.matchFunction(uri)) {
        return true
    }
    return false
}

/**
 * Resolves the given URI against the routes array into the corresponding Page
 * 
 * @param {string} uri
 * @returns {function} executable callback corresponding to the given URI
 */
const resolvePath = function (uri) {
    const foundRoute = currentRoutes.find((route) => { return routeMatch(route, uri) })
    if (foundRoute) {
        foundRoute.callback()
    }
}

module.exports = {
    run: resolvePath,
    route: createRoute,
    use: useRoutes,
}
