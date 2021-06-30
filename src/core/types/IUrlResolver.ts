import Action from './Action'

interface IUrlResolver {
    resolve(pathname: string): Action | null
}

export default IUrlResolver
