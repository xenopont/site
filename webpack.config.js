const path = require('path')

module.exports = {
    entry: './frontend/dist/app.js',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'frontend/dist'),
    },
}
