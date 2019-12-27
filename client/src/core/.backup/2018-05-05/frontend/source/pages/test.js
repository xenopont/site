const page = require('../lib/page')
const m = require('../lib/markup')

module.exports = page(
    m.div([
        m.h1('Hello World!').localizible(),
        m.div(
            m.a({ href: '/' }, 'Home Page')
        ),
    ])
)
