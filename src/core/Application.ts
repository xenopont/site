import IApplication from './types/IApplication'

class Application implements IApplication {
    protected config: IKeyValuePair = {}

    public constructor(config: IKeyValuePair) {
        this.config = config
    }

    public main(location: Location) {
        this.preStart(this.config)

        const router: IUrlResolver = this.createRouter(this.config)
        const action: Action | null = router.resolve(location.pathname)
        if (action) {
            action()
        }
        else {
            this.notFound(this.config)
        }
    }

    protected createRouter(config: IKeyValuePair): IUrlResolver {
        const router: IUrlResolver | IRouter = config.router || new Router()
        if ((router as IRouter).setRoutes && config.routes) {
            (router as IRouter).setRoutes(config.routes)
        }

        return router
    }

    protected preStart(config: IKeyValuePair): void {
        if (config.prepare instanceof Function) {
            config.prepare()
        }
    }

    protected notFound(): void {
        console.error('Not Found') // tslint:disable-line:no-console
    }
}

export default Application
