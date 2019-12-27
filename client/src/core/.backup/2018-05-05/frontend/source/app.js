'use strict'

document.addEventListener('DOMContentLoaded', function () {
    require('./commonStyle')
    const routes = require('./routes')
    const router = require('./lib/router')
    router.use(routes)

    router.run(window.location.pathname)
})
