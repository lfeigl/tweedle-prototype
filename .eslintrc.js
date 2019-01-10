module.exports = {
    env: {
        'browser': true,
        'es6': true,
        'node': true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'indent': [
            'error',
            4,
        ],
        'key-spacing': [
            'error',
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'no-console': [
            'warn',
            {
                'allow': [
                    'warn',
                    'error',
                ],
            },
        ],
        'no-inline-comments': 'error',
        'no-trailing-spaces': 'error',
        'no-unused-vars': 'warn',
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'spaced-comment': 'error',
    },
};
