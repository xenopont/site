import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express'

export default (app: Express): void => {
    app.get('/heartbeat', (request: Request, response: Response) => response.status(200).send('OK'))
    app.get('/articles/list', (request: Request, response: Response) => response.status(200).send({ list: [ 'hello', 'world' ] }))
}
