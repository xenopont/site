import productionConfig from './production'
import welcomeMessage from './dev.welcome'

const currentConfig = { ...productionConfig }

currentConfig.PORT = 3000
currentConfig.currentEnvironment = productionConfig.environments.dev
currentConfig.db.connectionString = `mongodb://site-mongo:27017/${currentConfig.db.dbName}`
currentConfig.welcomeMessage = welcomeMessage

export default currentConfig
