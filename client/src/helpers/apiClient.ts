import Arrays from '../core/Arrays'
import httpClient from '../core/jsonHttpClient'
import config from '../config/current'

const loadArticleList = async (): Promise<any[]> => {
    const response: any = await httpClient.get(config.apiRoot + '/contents')
    if (!response || !response.list || !Arrays.isArray(response.list)) {
        return []
    }
    return response.list
}

export default {
    loadArticleList,
}