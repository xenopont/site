import Action from '../core/types/Action'
import dom from '../core/dom'
import httpClient from '../core/http'

const errorMessage = () => {
    //
}

const showMainPage: Action = async () => {
    const response: string|null = await httpClient.get('https://google.com/')
    if (response === null) {
        errorMessage()
        return
    }
    dom.removeContent(document.body)
    console.log(response)
}

export default showMainPage
