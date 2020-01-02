import IKeyValuePair from '../core/types/IKeyValuePair'
import config from './app.production'

const devConfig: IKeyValuePair = { ...config }

devConfig.environment = 'development'

export default devConfig
