import productionConfig from './production'

const currentConfig = { ...productionConfig }

currentConfig.apiRoot = 'http://localhost:9091'
currentConfig.currentEnvironment = productionConfig.environments.dev

export default currentConfig
