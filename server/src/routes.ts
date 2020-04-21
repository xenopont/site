import { Express } from 'express-serve-static-core'
import { Request, Response } from 'express'

import db from './db/base'
import util from './db/util'

export default (app: Express): void => {
    app.get('/heartbeat', (request: Request, response: Response) => response.status(200).send('OK'))
    app.get('/contents', async (request: Request, response: Response) => {
        const res = await util.loadContents(db.client)
        response.status(200).send(res)
    })
}
