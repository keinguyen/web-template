module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  rules: {
    // recommended
    'for-direction': 'error',
    'getter-return': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-console': 'warn',
    'no-constant-condition': 'error',
    'no-control-regex': 'warn',
    'no-debugger': 'warn',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'warn',
    'no-empty-character-class': 'warn',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'warn',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-obj-calls': 'error',
    'no-regex-spaces': 'warn',
    'no-sparse-arrays': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'use-isnan': 'warn',
    'valid-typeof': ['error', {
      "requireStringLiterals": true
    }],
    'no-case-declarations': 'error',
    'no-empty-pattern': 'error',
    'no-fallthrough': 'error',
    'no-global-assign': 'error',
    'no-octal': 'error',
    'no-redeclare': ['error', {
      'builtinGlobals': true
    }],
    'no-self-assign': 'error',
    'no-unused-labels': 'warn',
    'no-useless-escape': 'warn',
    'no-delete-var': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'constructor-super': 'error',
    'no-class-assign': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-new-symbol': 'error',
    'no-this-before-super': 'error',
    'require-yield': 'error',

    // error
    'no-async-promise-executor': 'error',
    'no-misleading-character-class': 'error',
    'require-atomic-updates': 'error',

    'block-scoped-var': 'error',
    'curly': 'error',
    'eqeqeq': ['error', 'always'],
    'no-multi-str': 'error',
    'no-self-compare': 'error',
    'no-label-var': 'error',

    // Warning
    'no-await-in-loop': 'warn',
    'no-extra-parens': 'warn',

    'no-empty-function': 'warn',
    'no-return-assign': ['warn', 'always'],
    'no-useless-concat': 'warn',
    'quotes': ['warn', 'single', { 'allowTemplateLiterals': true }]
  }
}
