import m from './lib/jsapp/markup'
import Router from './lib/jsapp/router'

const router = new Router()

router.addRoute('/', () => { console.log('hello') }) // tslint:disable-line:no-console
router.addRoute('/path1', () => {
    document.body.appendChild(m.div('hello world!').toHtml())
})

export default router
