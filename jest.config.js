module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    'react-native-vector-icons/MaterialIcons':
      '<rootDir>/__mocks__/MaterialIcons.js',
    '^react-native-reanimated$':
      '<rootDir>/node_modules/react-native-reanimated/mock',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native(-community)?|expo(-[a-z-]+)?|@expo(-[a-z-]+)?(/.*)?|@unimodules|unimodules|sentry-expo|native-base|react-native-vector-icons|react-native-paper|react-native-dropdown-picker|react-native-toast-message|react-native-google-mobile-ads|react-native-reanimated|@react-navigation|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-qrcode-svg)',
  ],
};
