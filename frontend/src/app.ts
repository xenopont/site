import { Logger } from './services/logger'

class Website {
    public main(): void {
        const l = new Logger('Hello World!')
        l.out()
    }
}

const website = new Website()
website.main()
