import m from './lib/jsapp/markup'
import Router from './lib/jsapp/router'

const router = new Router()

router
.addRoute('/', () => {
    document.body.appendChild(
        m.div({ style: { padding: '4px', background: '#454545', color: '#f4f4f4' , border: '1px solid #c00' } },
            m.a({ href: '/path1' }, 'Path 1')
        )
        .onCreate(() => { console.log('index DOM created') }) // tslint:disable-line:no-console
        .toHtml()
    )
})
.addRoute('/path1', () => {
    document.body.appendChild(
        m.div({ style: { padding: '4px', background: '#fcfc00', color: '#444', border: '1px solid #454545' } },
            m.a({ href: '/' }, 'Index')
        )
        .toHtml()
    )
})

export default router
