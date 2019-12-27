const uniqueId = require('./uniqueId')

const attachLayout = function (layout) {
    this.layout = layout
    return this
}

/**
 * Assigns a callback to be executed after the page is shown
 * 
 * @param {function} callback
 * @returns {Object}
 */
const attachShowCallback = function (callback) {
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
        onShow: attachShowCallback,
    }
}
