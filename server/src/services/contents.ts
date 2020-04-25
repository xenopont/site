import { Collection, FilterQuery, FindOneOptions } from 'mongodb'

import { Article, ArticleReference, ArticleReferenceProjection } from '../../../shared/src/types/Article'
import config from '../config/current'
import mongo from '../core/db/mongo'

const loadContents = async (): Promise<ArticleReference[]|null> => {
    const articlesCollection: Collection<Article> = mongo.db(config.db.dbName).collection<Article>(config.db.collections.articles)
    const query: FilterQuery<Article> = { published: true }
    const options: FindOneOptions = { projection: ArticleReferenceProjection }

    return await articlesCollection.find(query, options).sort({ createdAt: -1 }).toArray().catch(() => { return null })
}

export default loadContents
