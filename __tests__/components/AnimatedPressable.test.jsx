import React from 'react';
import { Pressable, Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import AnimatedPressable from '../../src/components/Button/AnimatedPressable';

describe('AnimatedPressable component', () => {
  it('renderiza children sem crash', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <AnimatedPressable onPress={() => {}}>
          <Text>Pressione</Text>
        </AnimatedPressable>,
      );
    });
    expect(JSON.stringify(instance.toJSON())).toContain('Pressione');
  });

  it('chama onPress ao pressionar', async () => {
    const onPress = jest.fn();
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <AnimatedPressable onPress={onPress}>
          <Text>Btn</Text>
        </AnimatedPressable>,
      );
    });
    const pressable = instance.root.findByType(Pressable);
    await ReactTestRenderer.act(async () => {
      pressable.props.onPress();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('chama onLongPress quando fornecido', async () => {
    const onLongPress = jest.fn();
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <AnimatedPressable onPress={() => {}} onLongPress={onLongPress}>
          <Text>Btn</Text>
        </AnimatedPressable>,
      );
    });
    const pressable = instance.root.findByType(Pressable);
    await ReactTestRenderer.act(async () => {
      pressable.props.onLongPress();
    });
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('passa disabled=true para o Pressable interno', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(
        <AnimatedPressable onPress={jest.fn()} disabled>
          <Text>Btn</Text>
        </AnimatedPressable>,
      );
    });
    const pressable = instance.root.findByType(Pressable);
    expect(pressable.props.disabled).toBe(true);
  });
});
