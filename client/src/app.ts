import appConfig from './config/app'
import Application from './core/Application'
import IApplication from './core/types/IApplication'

(() => {
    const appRun = () => {
        const app: IApplication = new Application(appConfig)
        app.main(window.location.href)
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', appRun)
    }
    else {
        appRun()
    }
})()
