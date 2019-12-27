const arrays = require('./arrays')
//const windowOrigin = window.location.origin

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
            Object.keys(attributeValue).forEach((property) => { element.style[property] = attributeValue[property] })
            break
        case 'data':
            Object.keys(attributeValue).forEach((field) => { element.dataset[field] = attributeValue[field] })
            break
        default:
            element[attributeName] = attributeValue
            break
    }
}

/**
 * Event listener for <a> (hyperlink) elements with local URI in href
 * Allows to avoid the reload of the current document
 * 
 * @param {Event} event
 */
/*const clickLocalLink = function (event) {
    event.preventDefault()
    const router = require('./router')
    window.history.pushState(null, '', this.href)
    router.resolve(this.pathname).show()
}*/

/**
 * The popstate event listener for the window object
 * Allows to avoid the reload of the current document
 */
/*window.addEventListener('popstate', function () {
    const router = require('./router')
    router.resolve(window.location.pathname).show()
})*/

/**
 * Attaches the given string as inner HTML to the given DOM Node
 * 
 * @param {Node} element
 * @param {string} str
 */
const attachInnerHtml = function (element, str) {
    let child = null
    const tmp = document.createElement('div')
    tmp.innerHTML = str
    while (tmp.firstChild) {
        child = tmp.firstChild
        /*if (child.tagName === 'A' && child.origin === windowOrigin) {
            child.addEventListener('click', clickLocalLink)
        }*/
        element.appendChild(child)
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
    Object.keys(markup.attributes).forEach((attributeName) => {
        attachAttribute(element, attributeName, markup.attributes[attributeName])
    })

    // attach content
    markup.content.forEach((item) => {
        if (typeof item === 'string') {
            attachInnerHtml(element, item)
            return
        }
        if (item instanceof MarkupPrototype) {
            element.appendChild(item.toHtml())
            return
        }
    })

    /*if (markup.type === 'a' && element.origin === windowOrigin) {
        element.addEventListener('click', clickLocalLink)
    }*/

    // onCreate callback
    if (markup.createCallback) {
        markup.createCallback(element)
    }

    return element
}

const markAsLocalizible = function () {
    //
    return this
}

/**
 * Attaches the callback function the the current {Markup}.
 * The callback will be executed after the {Markup}.toHTML() call.
 * 
 * @param {function} callback
 */
const attachCreateCallback = function (callback) {
    this.createCallback = callback
    return this
}

/**
 * @constructor
 * @param {string} type
 * @param {Object} attributes
 * @param {(MarkupPrototype|string)[]} content
 */
const MarkupPrototype = function (type, attributes, content) {
    this.type = type
    this.attributes = attributes
    this.content = content
    this.toHtml = toHtml
    this.onCreate = attachCreateCallback
    this.localizible = markAsLocalizible
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
    img: function (attributes) {
        return this.element('img', attributes)
    },
    p: function (attributes, content) {
        return this.element('p', attributes, content)
    },
    span: function (attributes, content) {
        return this.element('span', attributes, content)
    },
}
