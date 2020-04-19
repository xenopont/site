import Action from '../core/types/Action'
import config from '../config/index'
import dom from '../core/dom'
import httpClient from '../core/http'

const errorMessage = () => {
    console.log('error occurred')
}

const showMainPage: Action = async () => {
    const response: string|null = await httpClient.get(config.apiHost + '/heartbeat')
    if (response === null) {
        errorMessage()
        return
    }
    dom.removeContent(document.body)
    console.log(response)
}

export default showMainPage
