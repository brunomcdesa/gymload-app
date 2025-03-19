module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['import', 'react', 'prettier'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'prettier/prettier': 'error',
  },
};
