import appConfig from './config/current'
import Application from './core/Application'
import IApplication from './core/types/IApplication'

(() => {
    const appRun = () => {
        const app: IApplication = new Application(appConfig)
        app.main(window.location)
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', appRun)
    }
    else {
        appRun()
    }
})()
