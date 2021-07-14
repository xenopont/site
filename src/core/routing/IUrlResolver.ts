import { RouteAction } from './RouteAction'

export interface IUrlResolver {
    resolve(pathname: string): RouteAction | null
}
