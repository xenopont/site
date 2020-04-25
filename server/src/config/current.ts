import productionConfig from './production'

const currentConfig = { ...productionConfig }

currentConfig.PORT = 3000
currentConfig.currentEnvironment = productionConfig.environments.dev
currentConfig.db.connectionString = `mongodb://site-mongo:27017/${currentConfig.db.dbName}`
currentConfig.welcomeMessage = () => {
    console.log('\n' + // eslint-disable-line no-console
    `Dev Environment started at ${new Date().toISOString()}`)
}

export default currentConfig
