const styles = require('../../lib/styles')

styles.insertRules({
    '.article_list_item_div': {
        padding: '0.5ex 2ex',
        background: '#f4f5f8'
    },
    '.article_list_item_div h2': {
        'font-family': 'DejaVu sans',
        'font-weight': 100
    },
    '.article_list_item_div div': {
        'font-weight': 100
    }
})

module.exports = function (data) {
    return {
        elementType: 'div',
        className: 'article_list_item_div',
        content: [
            {
                elementType: 'h2',
                content: data.title
            },
            {
                elementType: 'div',
                innerHTML: data.text
            }
        ]
    }
}
