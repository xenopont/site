import IApplication from './types/IApplication'
import IKeyValuePair from './types/IKeyValuePair'

class Application implements IApplication {
    private config: IKeyValuePair = {}

    public constructor(config: IKeyValuePair) {
        this.config = config
    }

    public main(route: string) {
        //
    }
}

export default Application
