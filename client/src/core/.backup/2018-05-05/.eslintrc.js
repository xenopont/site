module.exports = {
    extends: 'eslint:recommended',
    env: {
        browser: true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 7
    },
    rules: {
        'default-case': [
            'warn'
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ]
    },
    globals: {
        module: false,
        require: true
    }
}
