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
