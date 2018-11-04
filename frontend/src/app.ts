import RouteMethod from './lib/jsapp/interfaces/RouteMethod';
import router from './routes'

document.addEventListener('DOMContentLoaded', () => {
    const method: RouteMethod | null = router.resolve(window.location.pathname)
    if (method !== null) {
        method()
    }
})
