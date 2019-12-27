import RouteMethod from './RouteMethod'

export default interface IUrlResolver {
    resolve(url: string): RouteMethod | null
}
