import express from 'express'
import bodyParser from 'body-parser'

import log from './helpers/log'

const app = express()

const main = async () => {
    app.use(bodyParser.json())

    const PORT = 80
    const server = app.listen(PORT, () => {
        log.out(`App listening on port ${PORT}!`)
    })

    // catch console ^C signal
    process.on('SIGINT', () => {
        server.close(() => { log.out(); log.out('Process stopped') })
        process.exit(0)
    })
    // catch kubernetes term signal
    process.on('SIGTERM', () => {
        server.close(() => { log.out(); log.out('Process terminated') })
        process.exit(0)
    })
}

main().catch((e) => log.out(e))
