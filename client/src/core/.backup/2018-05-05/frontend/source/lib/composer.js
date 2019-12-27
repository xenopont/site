const m = require('./markup')
let cache = null

const activeElements = {
    container: m.div({id: 'active_container'}).toHtml(),
    layout: null,
    page: null,
}
document.body.appendChild(activeElements.container)

const buildLayout = function (markup) {
    return (cache && cache.getLayout(markup)) || markup.toHtml()
}

const buildPage = function (markup) {
    return (cache && cache.getPage(markup)) || markup.toHtml()
}

const removeActiveLayout = function () {
    if (cache && activeElements.layout) {
        cache.putLayout(activeElements.layout)
    }
    if (activeElements.layout) {
        activeElements.layout.parentNode.removeChild(activeElements.layout)
        activeElements.layout = null
    }
}

const removeActivePage = function () {
    if (cache && activeElements.page) {
        cache.putPage(activeElements.page)
    }
    if (activeElements.page) {
        activeElements.page.parentNode.removeChild(activeElements.page)
        activeElements.page = null
    }
}

const setActiveLayout = function (layoutMarkup) {
    if (!layoutMarkup) {
        if (activeElements.layout) {
            removeActivePage()
            removeActiveLayout()
        }
        return null
    }
    if (activeElements.layout && activeElements.layout.id === layoutMarkup.content.attributes.id) {
        return document.getElementById(layoutMarkup.containerId)
    }
    removeActivePage()
    const layoutElement = buildLayout(layoutMarkup)
    removeActiveLayout()
    activeElements.container.appendChild(layoutElement)
    activeElements.layout = layoutElement
    return document.getElementById(layoutMarkup.containerId)
}

const setActivePage = function (pageMarkup, layoutContainerElement) {
    if (activeElements.page && activeElements.page.id === pageMarkup.content.attributes.id) {
        return
    }
    const pageElement = buildPage(pageMarkup)
    const containerElement = layoutContainerElement || activeElements.container
    removeActivePage()
    containerElement.appendChild(pageElement)
    activeElements.page = pageElement
}

const showPage = function (pageMarkup) {
    const layoutContainerElement = setActiveLayout(pageMarkup.layout)
    setActivePage(pageMarkup, layoutContainerElement)

    if (pageMarkup.showCallback) {
        pageMarkup.showCallback()
    }
}

module.exports = {
    show: showPage,
}
