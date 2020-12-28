import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express'

import ContentsController from './controllers/contents'

export default (app: Express): void => {
    app.get('/heartbeat', (request: Request, response: Response) => response.status(200).send('OK'))
    app.get('/contents', ContentsController.contents)
}
