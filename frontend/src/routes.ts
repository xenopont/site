import Router from './lib/jsapp/router';

const router = new Router()

router.addRoute('/', () => { console.log('hello') })

export default router
