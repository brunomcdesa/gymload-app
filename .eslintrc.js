module.exports = {
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['import', 'react', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/namespace': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
