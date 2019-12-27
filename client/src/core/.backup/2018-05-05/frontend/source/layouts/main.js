const layout = require('../lib/layout')
const m = require('../lib/markup')

const containerId = 'main_page_content_container'

module.exports = layout(
    m.div([
        m.h1('Page Title'),
        m.div([
            m.a({href: '/'}, 'Home Page'), '&nbsp;|&nbsp;', m.a({href: '/test'}, 'Test Page'),
            '<br />',
            '<a href="/">another home page</a>',
        ]),
        m.div({id: containerId}),
        m.div('Footer'),
    ]),
    containerId
)
