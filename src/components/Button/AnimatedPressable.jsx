import PropTypes from 'prop-types';
import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SPRING_CONFIG = { damping: 15, stiffness: 400 };

const AnimatedPressable = ({
  onPress,
  onLongPress,
  style,
  wrapperStyle,
  children,
  disabled,
  testID,
}) => {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) scale.value = withSpring(0.95, SPRING_CONFIG);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SPRING_CONFIG);
  };

  return (
    <Animated.View style={[animStyle, wrapperStyle]}>
      <Pressable
        style={style}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        testID={testID}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

AnimatedPressable.propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  testID: PropTypes.string,
};

export default AnimatedPressable;
