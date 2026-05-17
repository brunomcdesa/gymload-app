module.exports = {
  __esModule: true,
  default: {
    initialize: jest.fn().mockResolvedValue(undefined),
  },
  BannerAd: () => null,
  BannerAdSize: { BANNER: 'BANNER' },
  TestIds: { BANNER: 'test-banner', INTERSTITIAL: 'test-interstitial' },
  AdEventType: { LOADED: 'loaded', ERROR: 'error', CLOSED: 'closed' },
  InterstitialAd: {
    createForAdRequest: jest.fn(() => ({
      addAdEventListener: jest.fn(() => jest.fn()),
      load: jest.fn(),
      show: jest.fn(),
    })),
  },
};
