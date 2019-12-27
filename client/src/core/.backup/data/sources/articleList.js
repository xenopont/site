const list = [
    {
        title: 'Article 1',
        text: 'Article 1 text preview.'
    },
    {
        title: 'Article 2',
        text: 'Here we have some lines to preview the second article content.<br />They are <em>HTML formatted</em>.'
    }
]

module.exports = function (callback) {
    if (typeof callback === 'function') {
        callback(null, list)
    }
}
