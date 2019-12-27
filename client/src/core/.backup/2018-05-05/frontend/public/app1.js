(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const routes = require('./routes')
    const router = require('./lib/router')

    const page = router.resolve(window.location.pathname, routes)
    page.show()
})

},{"./lib/router":9,"./routes":12}],2:[function(require,module,exports){
const layout = require('../lib/layout')
const m = require('../lib/markup')

const containerId = 'main_page_content_container'

module.exports = layout(
    m.div([
        m.h1('Page Title'),
        m.div(
            m.a({href: '/'}, 'Home Page Link')
        ),
        m.div({id: containerId}),
        m.div('Footer'),
    ]),
    containerId
)

},{"../lib/layout":6,"../lib/markup":7}],3:[function(require,module,exports){
const m = require('./markup')
const page = require('./page')

module.exports = page(
    m.div([
        m.h1('404 Not Found'),
        m.div('The requested page was not foundon this server.'),
    ])
)

},{"./markup":7,"./page":8}],4:[function(require,module,exports){
module.exports = {
    ensureArray: function (something) {
        if (something === null || typeof something === 'undefined') {
            return []
        }
        if (something.constructor === Array) {
            return something
        }
        return [something]
    }
}

},{}],5:[function(require,module,exports){
const m = require('./markup')
// const dom = require('./dom')

const config = {
    maxLayouts: 5,
    maxPages: 5,
}

const activePageContainer = m.div({ id:  'active_page_container'}).toHtml()
const layoutCacheContainer = m.div({ id: 'layout_cache', style: { display: 'none' } }).toHtml()
const pageCacheContainer = m.div({ id: 'page_cache', style: { display: 'none' } }).toHtml()
document.body.appendChild(activePageContainer)
document.body.appendChild(layoutCacheContainer)
document.body.appendChild(pageCacheContainer)

const getLayoutElement = function (layout) {
    for (let i = 0, len = layoutCacheContainer.children.length; i < len; i++) {
        if (layoutCacheContainer.children[i].id === layout.content.attributes.id) {
            return layoutCacheContainer.children[i]
        }
    }
    return layout.content.toHtml()
}

const getPageElement = function (page) {
    for (let i = 0, len = pageCacheContainer.children.length; i < len; i++) {
        if (pageCacheContainer.children[i].id === page.content.attributes.id) {
            return pageCacheContainer.children[i]
        }
    }
    return page.content.toHtml()
}

const activatePage = function (page) {
    if (activePageContainer.firstChild && activePageContainer.firstChild.id === page.content.attributes.id) {
        return
    }
}

module.exports = {
    get maxLayouts() { return config.maxLayouts},
    set maxLayouts(value) { config.maxLayouts = value },
    get maxPages() { return config.maxPages },
    set maxPages(value) { config.maxPages = value },

    activatePage: activatePage,
}

},{"./markup":7}],6:[function(require,module,exports){
const uniqueId = require('./uniqueId')

/**
 * Creates a layout object
 * 
 * @param {MarkupPrototype} markup 
 * @param {string} containerId 
 */
module.exports = function (markup, containerId) {
    if (!markup.attributes.id) {
        markup.attributes.id = uniqueId('layout_')
    }
    return {
        content: markup,
        containerId: containerId,
    }
}

},{"./uniqueId":10}],7:[function(require,module,exports){
const arrays = require('./arrays')

/**
 * Attaches the given attribute with its given value to the DOM Node
 * 
 * @param {Node} element 
 * @param {string} attributeName 
 * @param {(Object|string)} attributeValue 
 */
const attachAttribute = function (element, attributeName, attributeValue) {
    switch (attributeName) {
        case 'style':
            Object.keys(attributeValue).forEach(function (property) {
                element.style[property] = attributeValue[property]
            })
            break
        case 'data':
            Object.keys(attributeValue).forEach(function (field) {
                element['data-' + field] = attributeValue[field]
            })
            break
        default:
            element[attributeName] = attributeValue
            break
    }
}

/**
 * Attaches the given string as inner HTML to the given DOM Node
 * 
 * @param {Node} element 
 * @param {string} str 
 */
const attachInnerHtml = function (element, str) {
    const tmp = document.createElement('div')
    tmp.innerHTML = str
    while (tmp.firstChild) {
        element.appendChild(tmp.firstChild)
    }
}

/**
 * Converts the current markup to DOM Node
 * 
 * @returns {Node}
 */
const toHtml = function () {
    const markup = this

    const element = document.createElement(markup.type)
    
    // attach attributes
    Object.keys(markup.attributes).forEach(function (attributeName) {
        attachAttribute(element, attributeName, markup.attributes[attributeName])
    })

    // attach content
    markup.content.forEach(function (item) {
        if (typeof item === 'string') {
            attachInnerHtml(element, item)
            return
        }
        if (item instanceof MarkupPrototype) {
            element.appendChild(item.toHtml())
            return
        }
    })

    // onCreate callback
    if (typeof markup.createCallback === 'function') {
        markup.createCallback(element)
    }

    return element
}

/**
 * Attaches the callback function the the current {Markup}.
 * The callback will be executed after the {Markup}.toHTML() call.
 * 
 * @param {function} callback 
 */
const onCreate = function (callback) {
    this.createCallback = callback
    return this
}

/**
 * @constructor
 * @param {string} type 
 * @param {Object} attributes 
 * @param {[]|MarkupPrototype[]|string[]} content 
 */
const MarkupPrototype = function (type, attributes, content) {
    this.type = type
    this.attributes = attributes
    this.content = content
    this.toHtml = toHtml
    this.onCreate = onCreate
}

module.exports = {
    element: function (type, attributes, content) {
        if (typeof attributes === 'string' || attributes.constructor === Array || attributes instanceof MarkupPrototype) {
            content = attributes
            attributes = {}
        }
        if (!attributes || typeof attributes !== 'object') {
            attributes = {}
        }
        if (!content) {
            content = []
        }
        content = arrays.ensureArray(content)
        return new MarkupPrototype(type, attributes, content)
    },

    a: function (attributes, content) {
        return this.element('a', attributes, content)
    },
    div: function (attributes, content) {
        return this.element('div', attributes, content)
    },
    h1: function (attributes, content) {
        return this.element('h1', attributes, content)
    },
    h2: function (attributes, content) {
        return this.element('h2', attributes, content)
    },
    h3: function (attributes, content) {
        return this.element('h3', attributes, content)
    },
    h4: function (attributes, content) {
        return this.element('h4', attributes, content)
    },
    h5: function (attributes, content) {
        return this.element('h5', attributes, content)
    },
    h6: function (attributes, content) {
        return this.element('h6', attributes, content)
    },
    span: function (attributes, content) {
        return this.element('span', attributes, content)
    },
}

},{"./arrays":4}],8:[function(require,module,exports){
const cache = require('./cache')
const uniqueId = require('./uniqueId')

const attachLayout = function (layout) {
    this.layout = layout
    return this
}

/**
 * Replaces the document.body content with the page content
 */
const show = function () {
    cache.showPage(this)

    if (typeof this.showCallback === 'function') {
        this.showCallback()
    }
}

/**
 * Assigns a callback to be executed after the page is shown
 * 
 * @param {function} callback
 * @returns {Object}
 */
const onShow = function (callback) {
    this.showCallback = callback
    return this
}

/**
 * Creates a page object
 * 
 * @param {MarkupPrototype} content
 * @returns { content: {MarkupPrototype}, attachLayout: {function}, show: {function}, onShow: {function} }
 */
module.exports = function (content) {
    if (!content.attributes.id) {
        content.attributes.id = uniqueId('page_')
    }

    return {
        content: content,
        layout: null,
        attachLayout: attachLayout,
        show: show,
        onShow: onShow,
    }
}

},{"./cache":5,"./uniqueId":10}],9:[function(require,module,exports){
const lib404 = require('./404')

/**
 * Creates a Route Object
 * Syntax Sugar
 * 
 * @param {string|RegExp|function} path URI to be resolved
 * @param {Object} page Page Object corresponding o the URI
 * @returns {Object}
 */
const createRoute = function (path, page) {
    return {
        matchFunction: typeof path === 'function' ? path : null,
        page: page,
        regexp: path.constructor === RegExp ? path : null,
        stringUri: typeof path === 'string' ? path : null,
    }
}

/**
 * Checks if the Route Object matches the URI
 * 
 * @param {Object} route
 * @param {string} uri
 * @returns boolean
 */
const routeMatch = function (route, uri) {
    if (route.stringUri === uri) {
        return true
    }
    if (route.regexp !== null && uri.match(route.regexp)) {
        return true
    }
    if (route.matchFunction !== null && route.matchFunction(uri)) {
        return true
    }
    return false
}

/**
 * Resolves the given URI against the routes array into the corresponding Page
 * 
 * @param {string} uri
 * @param {Object[]} routes
 */
const resolvePath = function (uri, routes) {
    const foundRoute = routes.find(function (route) {
        return routeMatch(route, uri)
    })
    if (typeof foundRoute !== 'undefined') {
        return foundRoute.page
    }
    return lib404
}

module.exports = {
    resolve: resolvePath,
    route: createRoute,
}

},{"./404":3}],10:[function(require,module,exports){
const generator = function* () {
    let index = 0
    while (true) {
        yield index++
    }
}

const gen = generator()
module.exports = function (prefix) {
    return (prefix || '') + gen.next().value
}
},{}],11:[function(require,module,exports){
const m = require('../lib/markup')
const page = require('../lib/page')

const mainPageLayout = require('../layouts/main')

module.exports = page(
    m.div([
        m.h1('404 Not Found'),
        m.div('This isn\'t the page you are looking for.'),
    ])
).attachLayout(mainPageLayout)

},{"../layouts/main":2,"../lib/markup":7,"../lib/page":8}],12:[function(require,module,exports){
const route = require('./lib/router').route
const notFoundPage = require('./pages/404')

module.exports = [
    route('/', notFoundPage),
]

},{"./lib/router":9,"./pages/404":11}]},{},[1]);
