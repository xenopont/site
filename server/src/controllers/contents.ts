import loadContents from '../services/contents'
import { Request, Response } from 'express'
import { ArticleReference } from '../../../shared/src/types/Article'

const contents = async (request: Request, response: Response): Promise<void> => {
    const list: ArticleReference[]|null = await loadContents()
    if (list === null) {
        response.status(500).send('Internal Server Error')
        return
    }
    response.status(200).send({ list: list })
}

export default {
    contents,
}
