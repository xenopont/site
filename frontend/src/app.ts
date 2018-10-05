import router from './routes'
import IRouteMethod from './lib/jsapp/interfaces/routeMethod';

document.addEventListener('DOMContentLoaded', () => {
    const method: IRouteMethod | null = router.resolve(window.location.pathname)
    if (method !== null) {
        method()
    }
})
