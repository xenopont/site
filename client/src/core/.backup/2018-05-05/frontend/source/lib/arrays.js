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
