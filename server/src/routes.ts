import { Express } from 'express-serve-static-core'

export default (app: Express): void => {
    app.get('/heartbeat', (request, response) => response.status(200).send('OK'))
}
