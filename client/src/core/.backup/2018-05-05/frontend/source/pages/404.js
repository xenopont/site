const m = require('../lib/markup')
const page = require('../lib/page')

const mainPageLayout = require('../layouts/main')

module.exports = page(
    m.div([
        m.h1('404 Not Found'),
        m.div('This isn\'t the page you are looking for.'),
    ])
).attachLayout(mainPageLayout)
