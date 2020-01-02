const generator = function* () {
    let index = 0
    while (true) {
        yield index++
    }
}

const gen = generator()

/**
 * Returns a string with the prefix given and autogenerated unique number
 * 
 * @param {string} prefix 
 * @returns {string}
 */
module.exports = function (prefix) {
    return (prefix || '') + gen.next().value
}