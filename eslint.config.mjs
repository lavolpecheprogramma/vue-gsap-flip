import antfuConfig from '@antfu/eslint-config'

export default antfuConfig({
  rules: {
    'no-console': 'off',
    'antfu/if-newline': 'off',
    'css/unknownAtRules': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'perfectionist/sort-imports': ['error', {
      internalPattern: [
        '^~~/.+',
        '^~/.+',
        '^@@/.+',
        '^@/.+',
        '^#.+'
      ],
      groups: [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling', 'index']
      ]
    }],
    'regexp/no-unused-capturing-group': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/comma-dangle': ['error', 'never'],
    'style/space-before-function-paren': ['error', 'always'],
    'vue/attributes-order': ['error', {
      alphabetical: true,
      order: [
        'DEFINITION',
        'CONDITIONALS',
        'LIST_RENDERING',
        'RENDER_MODIFIERS',
        ['UNIQUE', 'GLOBAL'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'ATTR_SHORTHAND_BOOL',
        'ATTR_STATIC',
        'ATTR_DYNAMIC',
        'EVENTS',
        'CONTENT',
        'SLOT'
      ]
    }],
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/comma-dangle': ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
})
