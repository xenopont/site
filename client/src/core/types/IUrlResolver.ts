import RouteMethod from './RouteMethod'

interface IUrlResolver {
    resolve(url: string): RouteMethod | null
}

export default IUrlResolver
