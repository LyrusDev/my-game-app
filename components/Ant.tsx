// Ant.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface AntProps {
  position: { x: number; y: number };
  onPress: () => void;
}

const Ant: React.FC<AntProps> = ({ position, onPress }) => {
  const animatedPositionX = useSharedValue(position.x);
  const animatedPositionY = useSharedValue(position.y);

  const handlePress = () => {
    runOnJS(onPress)();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: animatedPositionX.value,
      top: animatedPositionY.value,
    };
  });

  animatedPositionX.value = withSpring(position.x);
  animatedPositionY.value = withSpring(position.y);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.ant, animatedStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ant: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
  },
});

export default Ant;
