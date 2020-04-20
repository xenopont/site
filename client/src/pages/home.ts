import Action from '../core/types/Action'
import dom from '../core/dom'
import api from '../helpers/apiClient'

const errorMessage = () => {
    console.log('error occurred')
}

const showMainPage: Action = async () => {
    const articles: any[] = await api.loadArticleList()
    if (articles === null) {
        errorMessage()
        return
    }
    dom.removeContent(document.body)
    console.log(articles)
}

export default showMainPage
