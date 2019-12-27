const path = require('path')

module.exports = {
    entry: './js-compiled/app.js',
    mode: 'production',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './dist'),
    },
}
