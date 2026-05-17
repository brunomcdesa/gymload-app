import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title }) => <Text testID="header-title">{title}</Text>;
});

const buildProps = () => ({
  navigation: {
    setOptions: jest.fn(),
    goBack: jest.fn(),
  },
});

const AjudaSuporte =
  require('../../src/modules/usuario/screens/AjudaSuporte').default;

describe('AjudaSuporte screen', () => {
  it('renderiza sem crash', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<AjudaSuporte {...props} />);
    });
  });

  it('configura header com headerLeft null', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<AjudaSuporte {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    expect(opts.headerLeft()).toBeNull();
  });

  it('botao Voltar chama goBack', async () => {
    const props = buildProps();
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<AjudaSuporte {...props} />);
    });
    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});
