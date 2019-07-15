module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  globals: {
    $: true,
    jQuery: true,
    Plugin: true,
    __webpack_require__: true
  },
  rules: {
    // recommended
    'for-direction': 2,
    'getter-return': 2,
    'no-compare-neg-zero': 2,
    'no-cond-assign': [2, 'always'],
    'no-console': [1, {
      allow: ['warn', 'error']
    }],
    'no-constant-condition': 2,
    'no-control-regex': 1,
    'no-debugger': 1,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 1,
    'no-empty-character-class': 1,
    'no-ex-assign': 2,
    'no-extra-boolean-cast': 1,
    'no-extra-semi': 2,
    'no-func-assign': 2,
    'no-inner-declarations': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-obj-calls': 2,
    'no-regex-spaces': 1,
    'no-sparse-arrays': 2,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unsafe-negation': 2,
    'use-isnan': 1,
    'valid-typeof': [2, {
      "requireStringLiterals": true
    }],
    'no-case-declarations': 2,
    'no-empty-pattern': 2,
    'no-fallthrough': 2,
    'no-global-assign': 2,
    'no-octal': 2,
    'no-redeclare': [2, {
      'builtinGlobals': true
    }],
    'no-self-assign': 2,
    'no-unused-labels': 1,
    'no-useless-escape': 1,
    'no-delete-var': 2,
    'no-undef': 2,
    'no-unused-vars': 1,
    'no-mixed-spaces-and-tabs': 1,
    'constructor-super': 2,
    'no-class-assign': 2,
    'no-const-assign': 2,
    'no-dupe-class-members': 2,
    'no-new-symbol': 2,
    'no-this-before-super': 2,
    'require-yield': 2,

    // error
    'no-async-promise-executor': 2,
    'no-misleading-character-class': 2,
    'require-atomic-updates': 2,
    'accessor-pairs': 2,
    'block-scoped-var': 2,
    'curly': 2,
    'dot-location': [2, 'property'],
    'eqeqeq': [2, 'always'],
    'no-caller': 2,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-implied-eval': 2,
    'no-iterator': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-loop-func': 2,
    'no-multi-str': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-octal-escape': 2,
    'no-param-reassign': 2,
    'no-proto': 2,
    'no-return-assign': [2, 'always'],
    'no-return-await': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-with': 2,
    'vars-on-top': 2,
    'wrap-iife': [2, 'inside', {
      functionPrototypeMethods: true
    }],
    'no-label-var': 2,
    'no-use-before-define': 2,

    // Warning
    'no-await-in-loop': 1,
    'array-callback-return': 1,
    'class-methods-use-this': 1,
    'consistent-return': [1, {
      treatUndefinedAsUnspecified: true
    }],
    'dot-notation': [1, {
      allowKeywords: false
    }],
    'guard-for-in': 1,
    'no-alert': 1,
    'no-div-regex': 1,
    'no-else-return': 1,
    'no-empty-function': 1,
    'no-extra-bind': 1,
    'no-extra-label': 1,
    'no-floating-decimal': 1,
    'no-multi-spaces': [1, {
      ignoreEOLComments: true,
      exceptions: {
        Property: false,
        BinaryExpression: true,
        VariableDeclarator: true,
        ImportDeclaration: true
      }
    }],
    'no-script-url': 1,
    'no-useless-call': 1,
    'no-useless-concat': 1,
    'no-useless-return': 1,
    'no-void': 1,
    'require-await': 1,
    'no-undef-init': 1,
    'no-undefined': 1,

    // Stylist
    'block-spacing': 1,
    'brace-style': 1,
    'comma-spacing': 1,
    'comma-style': 1,
    'computed-property-spacing': 1,
    'func-call-spacing': 1,
    'indent': [1, 2, {
      SwitchCase: 1,
      MemberExpression: 'off'
    }],
    'key-spacing': 1,
    'keyword-spacing': 1,
    'lines-between-class-members': 1,
    'max-len': [1, {
      code: 80,
      ignoreRegExpLiterals: true,
      ignoreTemplateLiterals: true,
      ignoreStrings: true
    }],
    'no-lonely-if': 1,
    'no-multi-assign': 1,
    'no-multiple-empty-lines': [1, {
      max: 2,
      maxEOF: 1,
      maxBOF: 0
    }],
    'no-trailing-spaces': 1,
    'no-unneeded-ternary': [1, {
      defaultAssignment: false
    }],
    'no-whitespace-before-property': 1,
    'quotes': [1, 'single', {
      allowTemplateLiterals: true
    }],
    'semi-spacing': 1,
    'semi': 1,
    'space-infix-ops': 1,
    'switch-colon-spacing': 1,
    'no-duplicate-imports': [1, {
      includeExports: true
    }],
    'no-useless-computed-key': 1,
    'no-var': 1,
    'object-shorthand': 1,
    'prefer-template': 1,
    'template-curly-spacing': 1
  }
}
