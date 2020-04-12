import express from 'express'
import bodyParser from 'body-parser'

const app = express()

const main = async () => {
    app.use(bodyParser.json())

    const PORT = 80
    const server = app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`)
    })

    // catch console ^C signal
    process.on('SIGINT', () => {
        server.close(() => { console.log(); console.log('Process stopped') }) // tslint-disable-line no-console
        process.exit(0)
    })
    // catch kubernetes term signal
    process.on('SIGTERM', () => {
        server.close(() => { console.log(); console.log('Process terminated') }) // tslint-disable-line no-console
        process.exit(0)
    })
}

main().catch((e) => console.log(e))
