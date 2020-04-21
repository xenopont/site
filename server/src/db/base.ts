/**
 * MongoDB driver documentation: http://mongodb.github.io/node-mongodb-native/
 */

import { MongoClient, MongoError } from 'mongodb'

import config from '../config/current'

const client: MongoClient = new MongoClient(config.db.connectionString, {
    poolSize: 10,
    ssl: false,
    useUnifiedTopology: true,
})

// async wrapper
const clientConnect = async (): Promise<void> => {
    return new Promise<void>((resolve, reject): void => {
        client.connect((err: MongoError): void => {
            if (err) {
                reject(err)
                return
            }
            resolve()
        })
    })
}

// export
const connect = async (): Promise<boolean> => {
    try {
        await clientConnect()
        return true
    }
    catch (e) {
        //
    }
    return false
}

// export
const disconnect = async (): Promise<void> => {
    await client.close()
}

export default {
    client,

    connect,
    disconnect,
}
