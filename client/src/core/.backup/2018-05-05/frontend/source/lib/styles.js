const m = require('./markup')

const style = m.element('style', { type: 'text/css' }).toHtml()
document.head.appendChild(style)

/**
 * Inserts a new rule in a common style sheet of the app.
 * Builds a string "selector: {prop: val; prop: val;}"
 * which is required by the default js method.
 * @compatibility IE9
 * @param {string} selector
 * @param {Object} description
 */
const insertRule = function (selector, description) {
    const rule = selector + ' { ' +
        Object.keys(description).reduce((acc, val) => {
            return acc + val + ': ' + description[val] + '; '
        }, '') +
    ' }'
    style.sheet.insertRule(rule, style.sheet.cssRules.length)
}

/**
 * Inserts a set of rules into the app's stylesheet
 * 
 * @example insertRules({
 *     body: {
 *         margin: 0,
 *         backgroundColor: '#fcf8f0',
 *     },
 *     div.article: {
 *         width: '100%',
 *     },
 * })
 * @param {Object} set
 */
const insertRules = function (set) {
    Object.keys(set).forEach((selector) => { insertRule(selector, set[selector]) })
}

module.exports = {
    insertRules: insertRules
}
