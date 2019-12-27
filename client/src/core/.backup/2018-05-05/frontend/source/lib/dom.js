const arrays = require('./arrays')

/**
 * Removes the content of the given DOM Node
 * 
 * @param {Node} container 
 */
const removeContent = function (container) {
    while (container.lastChild) {
        container.removeChild(container.lastChild)
    }
}

/**
 * Removes the content of the given Dom Node and attaches another one
 * 
 * @param {Node} container 
 * @param {Node|Node[]} newContent 
 */
const replaceContent = function (container, newContent) {
    removeContent(container)
    arrays.ensureArray(newContent).forEach((item) => { container.appendChild(item) })
}

module.exports = {
    $: function (id) {
        return document.getElementById(id)
    },
    removeContent: removeContent,
    replaceContent: replaceContent,
}
