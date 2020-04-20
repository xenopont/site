module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
    ],
    globals: {},
    ignorePatterns: [ './node_modules/', './dist/', './cache/' ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        impliedStrict: true,
    },
    plugins: [ '@typescript-eslint' ],
    root: true,
    rules: {
        indent: [ 'error', 4, { SwitchCase: 1 } ],
        'linebreak-style': [ 'error', 'unix' ],
        quotes: [ 'error', 'single' ],
        'eol-last': [ 'error', 'always' ],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'never',
            exports: 'never',
            functions: 'never',
        }],
        semi: [ 'error', 'never' ],
        'no-multiple-empty-lines': [ 2, { max: 1, maxBOF: 0 } ],
    },
}
