import { LocalisedContent } from './LocalisedContent'
import { MongoProjection } from './MongoProjection'

export interface ArticleReference {
    createdAt: Date,
    urls: LocalisedContent[],
    titles: LocalisedContent[]
}

export const ArticleReferenceProjection: MongoProjection = {
    _id: false,
    createdAt: true,
    titles: true,
    urls: true,
}

export interface Article extends ArticleReference {
    _id: string,
    published: boolean,
    contents: LocalisedContent[],
}
