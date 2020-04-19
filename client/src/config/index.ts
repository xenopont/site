/*
A config for development. Shall be replaced by production.ts in a production container.
 */

import IKeyValuePair from '../core/types/IKeyValuePair'

import config from './production'

const devConfig: IKeyValuePair = { ...config }

devConfig.apiHost = 'http://localhost:9091'
devConfig.currentEnvironment = config.environments.dev

export default devConfig
