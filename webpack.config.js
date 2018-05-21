const path = require('path')

module.exports = {
    entry: './frontend/js-compiled/app.js',
    // entry: './frontend/src/app.ts',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'frontend/dist'),
    },
    /*devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: '/\.tsx?$/',
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    watch: false,
    watchOptions: {
        aggregateTimeout: 300,
        // watch doesn't work on NFS or in Virtual Box
        // poll must be set to 1000 (ms) instead
        // this will check for file changes every second
        poll: false,
    },*/
}
