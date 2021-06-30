import Action from '../core/types/Action'
import dom from '../core/dom'
import api from '../helpers/apiClient'
import m from '../core/markup'

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
    document.title = 'Home Page'
    const list = m.ul()
    articles.forEach((art) => {
        list.appendChild(m.li(
            m.a({ href: contentByLocale(art.urls)}, contentByLocale(art.titles))
        ))
    })
    document.body.appendChild(list.toHtml())
}

// move to Article Object
const contentByLocale = (l10ns: any[], locale: string = 'en'): string => {
    const found = l10ns.find((l) => { return l.locale === locale })
    if (found) {
        return found.content
    }
    return ''
}

export default showMainPage
