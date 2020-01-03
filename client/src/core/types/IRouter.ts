import IUrlResolver from './IUrlResolver'

interface IRouter extends IUrlResolver {
    setRoutes(routes: any): void
    addRoute(route: any): this
}

export default IRouter
