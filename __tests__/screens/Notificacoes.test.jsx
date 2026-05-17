import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title }) => <Text testID="header-title">{title}</Text>;
});

jest.mock('../../src/components/Button/style/formFooterStyle', () => ({
  formFooter: {},
  backButton: {},
  backButtonText: {},
}));

const buildProps = () => ({
  navigation: {
    setOptions: jest.fn(),
    goBack: jest.fn(),
  },
});

const Notificacoes = require('../../src/modules/usuario/screens/Notificacoes').default;

describe('Notificacoes screen', () => {
  it('renderiza sem crash', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<Notificacoes {...props} />);
    });
  });

  it('configura header com headerLeft null', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<Notificacoes {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    expect(opts.headerLeft()).toBeNull();
  });

  it('botao Voltar chama goBack', async () => {
    const props = buildProps();
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<Notificacoes {...props} />);
    });
    const btnVoltar = instance.root.findByProps({ testID: 'btn-voltar' });
    await ReactTestRenderer.act(async () => {
      btnVoltar.props.onPress();
    });
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});
