module.exports = function (api) {
  api.cache(true);
  const isProd = process.env.NODE_ENV === 'production';
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ...(isProd ? ['transform-remove-console'] : []),
      ...(isProd ? [['transform-react-remove-prop-types', { removeImport: true }]] : []),
      'react-native-reanimated/plugin',
    ],
  };
};
