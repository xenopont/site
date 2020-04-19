import { Server } from 'http'
import { Express } from 'express-serve-static-core'
import express from 'express'
import bodyParser from 'body-parser'

import config from './config/current'
import cors from './services/cors'
import log from './services/log'
import db from './db/base'
import routes from './routes'
import sleep from './services/sleep'

const app: Express = express()

const main = async (): Promise<void> => {
    // check the db connection
    log.info('Connecting to the database...')
    if (! await db.connect()) {
        const wait: number = 2
        log.error(`No connection to the database. Shutting down the application in ${wait} seconds.`)
        await sleep(wait * 1000)
        process.exit(-1)
        return
    }
    log.info('Connection to the database established.')

    // start a server
    log.info('Starting a server...')
    app.use(bodyParser.json())
    app.use(cors)
    routes(app)
    const server: Server = app.listen(config.PORT, () => {
        if (config.currentEnvironment === config.environments.dev) {
            config.welcomeMessage()
        }
        log.info(`App listening on port ${config.PORT}!`)
    })

    // catch console ^C signal
    process.on('SIGINT', () => {
        server.close(() => { console.log(); log.info('Process stopped') }) // eslint-disable-line no-console
        db.disconnect()
        process.exit(0)
    })
    // catch kubernetes term signal
    process.on('SIGTERM', () => {
        server.close(() => { console.log(); log.info('Process terminated') }) // eslint-disable-line no-console
        db.disconnect()
        process.exit(0)
    })
}

main().catch((e) => log.error(e))
