const route = require('./lib/router').route

module.exports = [
    route('/', function () {
        console.log('Hello World!')
    }),
]
