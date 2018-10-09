import Router from './lib/jsapp/router';

const router = new Router()

router.addRoute('/', () => { console.log('hello') }) // tslint:disable-line:no-console

export default router
