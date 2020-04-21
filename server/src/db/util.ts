// db.getCollection('articles').find({ published: true }, { createdAt: true, urls: true, titles: true }).sort({ createdAt: -1 })

import { MongoClient } from 'mongodb'

const loadContents = async (db: MongoClient): Promise<any[]> => {
    const res = await db.db('site').collection('articles').find({ published: true }, { projection: { createdAt: true, urls: true, titles: true } }).toArray()
    return res
}

export default {
    loadContents,
}
