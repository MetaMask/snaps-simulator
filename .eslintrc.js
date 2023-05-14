module.exports = {
  root: true,

  extends: ['@metamask/eslint-config'],

  settings: {
    'import/extensions': ['.ts', '.tsx'],
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        '@metamask/eslint-config-typescript',
        '@metamask/eslint-config-browser',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        '@typescript-eslint/no-shadow': [
          'error',
          {
            allow: ['Text'],
          },
        ],

        'react/display-name': 'off',
        'react/prop-types': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },

    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['*.test.ts', '*.test.js'],
      extends: [
        '@metamask/eslint-config-jest',
        '@metamask/eslint-config-nodejs',
      ],
      rules: {
        'no-restricted-globals': 'off',
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'expectSaga'],
          },
        ],
      },
    },

    {
      files: ['webpack.config.ts'],
      extends: ['@metamask/eslint-config-nodejs'],
    },
  ],

  ignorePatterns: ['!.eslintrc.js', '!.prettierrc.js', 'dist/', '.yarn/'],
};
