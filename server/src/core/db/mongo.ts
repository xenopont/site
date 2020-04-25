import { Db, MongoClient, MongoClientCommonOption, MongoClientOptions } from 'mongodb'

const defaultConnectionOptions: MongoClientOptions = {
    poolSize: 10,
    ssl: false,
    useUnifiedTopology: true,
}

let clientInstance: MongoClient|null = null

const connect = async (connectionString: string, options?: MongoClientOptions): Promise<boolean> => {
    if (clientInstance !== null) {
        return true
    }
    options = options || defaultConnectionOptions
    clientInstance = new MongoClient(connectionString, options)
    try {
        await clientInstance.connect()
        return true
    }
    catch (e) {
        //
    }
    return false
}

const db = (dbName?: string, options?: MongoClientCommonOption): Db => {
    return (clientInstance as MongoClient).db(dbName, options)
}

const disconnect = async (force?: boolean): Promise<void> => {
    if (clientInstance === null) {
        return
    }
    return (clientInstance as MongoClient).close(force)
}

export default {
    connect,
    db,
    disconnect,
}
