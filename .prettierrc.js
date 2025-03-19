module.exports = {
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  plugins: ['prettier-plugin-organize-imports'],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      options: {
        semi: true,
        singleQuote: true,
      },
    },
  ],
};
