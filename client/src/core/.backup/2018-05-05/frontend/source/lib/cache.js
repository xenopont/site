const m = require('./markup')

const config = {
    maxLayouts: 5,
    maxPages: 5,
}

/*const activePageContainer = m.div({ id:  'active_page_container'}).toHtml()*/
const layoutCacheContainer = m.div({ id: 'layout_cache', style: { display: 'none' } }).toHtml()
const pageCacheContainer = m.div({ id: 'page_cache', style: { display: 'none' } }).toHtml()
/*document.body.appendChild(activePageContainer)*/
document.body.appendChild(layoutCacheContainer)
document.body.appendChild(pageCacheContainer)

/**
 * Gets the corresponding DOM Node from the cache or creates a new one
 * 
 * @param {MarkupPrototype} layout
 * @returns {Node}
 */
/*const getLayoutElementFromCache = function (layout) {
    for (let i = 0, len = layoutCacheContainer.children.length; i < len; i++) {
        if (layoutCacheContainer.children[i].id === layout.content.attributes.id) {
            return layoutCacheContainer.children[i]
        }
    }
    const layoutElement = layout.content.toHtml()
    layoutElement.dataset.cachePageContainerId = layout.containerId
    return layoutElement
}*/

/**
 * Gets the corresponding DOM Node from the cache or creates a new one
 * 
 * @param {MarkupPrototype} page
 * @returns {Node}
 */
/*const getPageElementFromCache = function (page) {
    for (let i = 0, len = pageCacheContainer.children.length; i < len; i++) {
        if (pageCacheContainer.children[i].id === page.content.attributes.id) {
            return pageCacheContainer.children[i]
        }
    }
    return page.content.toHtml()
}*/

/**
 * Returns the currently active layout and page
 * each of them can be null
 * 
 * @returns { layout: {Node|null}, page: {Node|null} }
 */
/*const getActiveElements = function () {
    const result = {
        layout: null,
        page: null,
    }
    if (activePageContainer.firstChild) {
        if (typeof activePageContainer.firstChild.dataset.cachePageContainerId === 'string') { // this is a layout element
            result.layout = activePageContainer.firstChild
            result.page = document.getElementById(result.layout.dataset.cachePageContainerId).firstChild
            return result
        }
        // otherwise, whatever is there can be considered as a page
        result.page = activePageContainer.firstChild
    }
    return result
}*/

/**
 * Puts the given page to the cache
 * 
 * @param {Node} pageElement
 */
/*const movePageElementToCache = function (pageElement) {
    if (pageCacheContainer.hasChildNodes() && pageCacheContainer.childNodes.length > config.maxPages) {
        pageCacheContainer.removeChild(pageCacheContainer.firstChild)
    }
    pageCacheContainer.appendChild(pageElement)
}*/

/**
 * Puts the given layout to the cache
 * 
 * @param {Node} layoutElement
 */
/*const moveLayoutElementToCache = function (layoutElement) {
    if (layoutCacheContainer.hasChildNodes() && layoutCacheContainer.childNodes.length > config.maxLayouts) {
        layoutCacheContainer.removeChild(layoutCacheContainer.firstChild)
    }
    layoutCacheContainer.appendChild(layoutElement)
}*/

/**
 * Puts the given layout node to the active page container
 * 
 * @param {Node} layoutElement
 * @returns {string} The layout's container id where the active page must be displayed
 */
/*const setLayout = function (layoutElement) {
    activePageContainer.appendChild(layoutElement)
    return document.getElementById(layoutElement.dataset.cachePageContainerId)
}*/

/**
 * Puts the page node to the given container (active page container or layout content container)
 * 
 * @param {Node} pageElement
 * @param {Node} container
 */
/*const setPage = function (pageElement, container) {
    container.appendChild(pageElement)
}*/

/**
 * Shows a new page with its layout within the active page container
 * 
 * @param {MarkupPrototype} page 
 */
/*const activatePage = function (page) {
    const activeElements = getActiveElements()
    if (activeElements.page) {
        movePageElementToCache(activeElements.page)
    }
    if (activeElements.layout) {
        moveLayoutElementToCache(activeElements.layout)
    }
    if (page.layout) {
        const layoutContainer = setLayout(getLayoutElementFromCache(page.layout))
        setPage(getPageElementFromCache(page), layoutContainer)
    }
    else {
        setPage(getPageElementFromCache(page), activePageContainer)
    }
}*/

module.exports = {
    get maxLayouts() { return config.maxLayouts},
    set maxLayouts(value) { config.maxLayouts = value },
    get maxPages() { return config.maxPages },
    set maxPages(value) { config.maxPages = value },

    getPage: function (/*id*/) {
        
    }
    /*activatePage: activatePage,*/
}
