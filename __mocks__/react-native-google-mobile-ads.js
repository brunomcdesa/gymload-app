module.exports = {
  __esModule: true,
  default: {
    initialize: jest.fn().mockResolvedValue(undefined),
  },
  BannerAd: () => null,
  BannerAdSize: { BANNER: 'BANNER' },
  TestIds: { BANNER: 'test-banner' },
};
