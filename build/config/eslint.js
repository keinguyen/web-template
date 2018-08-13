module.exports = {
  rules: {
    // Error
    'no-cond-assign': ['error', 'always'],
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-obj-calls': 'error',
    'no-unexpected-multiline': 'error',
    'block-scoped-var': 'error',
    'curly': 'error',
    'eqeqeq': ['error', 'always'],
    'no-multi-str': 'error',
    'no-redeclare': ['error', { 'builtinGlobals': true }],
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-undef': 'error',

    // Warning
    'no-constant-condition': ['warn', { 'checkLoops': false }],
    'no-empty': 'warn',
    'no-extra-semi': 'warn',
    'no-empty-function': 'warn',
    'no-return-assign': ['warn', 'always'],
    'no-useless-concat': 'warn',
    'no-useless-escape': 'warn',
    'no-unused-vars': 'warn',
    'quotes': ['warn', 'single', { 'allowTemplateLiterals': true }]
  },
  envs: ['browser', 'es6'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      modules: true
    }
  }
}
