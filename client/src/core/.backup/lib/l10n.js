const languagePackages = require('../l10n/packages') // @todo "magic" line
const language = require('./language')

module.exports = {
    localize: function (obj) {
        let result = obj.text
        let lang = language.current
        if (languagePackages[lang]) {
            let key = '' + obj.text + (obj.index ? obj.index : '')
            if (languagePackages[lang][key]) {
                result = languagePackages[lang][key]
            }
        }
        result = result.replace(/\{%([\d\w]+)\}/g, function (match, keyFound) { // @todo what is this regexp? looks like params replacement
            return obj.params[keyFound] || ''
        })
        return result
    },

    makeLocalizable: function (str, params, index) {
        return {
            text: str || '',
            params: params || {},
            index: index || ''
        }
    },

    isLocalizable: function (obj) {
        return typeof obj === 'object' &&
            obj.hasOwnProperty('text') &&
            obj.hasOwnProperty('params') &&
            obj.hasOwnProperty('index')
    }
}
