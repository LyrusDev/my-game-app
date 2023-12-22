// Insect.js
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

const Insect = ({ onPress, insect, gameLvl }: any) => {
  const [imageSource, setImageSource] = useState(require("../assets/ant.png"));
  const insectPositionX = useSharedValue(0);
  const insectPositionY = useSharedValue(0);
  const insectRotation = useSharedValue(0);

  const initInsect = () => {
    if(insect === 'ant') {
      setImageSource(require("../assets/ant.png"))
    } else if (insect === 'spider') {
      setImageSource(require("../assets/spider.png"))
    } else {
      setImageSource(require("../assets/cockroach.png"))
    }
  }

  const moveInsect = () => {
    const maxX = width - 50;
    const maxY = height - 50;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    insectPositionX.value = withTiming(newX, { duration: 1000 });
    insectPositionY.value = withTiming(newY, { duration: 1000 });
    insectRotation.value = withTiming(Math.random() * 360, { duration: 1000 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: insectPositionX.value,
      top: insectPositionY.value,
      transform: [{ rotate: `${insectRotation.value}deg` }],
    };
  });

  useEffect(() => {
    const insectMovementInterval = setInterval(moveInsect, gameLvl);
    initInsect()
    return () => {
      clearInterval(insectMovementInterval);
    };
  }, []);


  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Animated.Image
          source={imageSource}
          style={[styles.insect, animatedStyle]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  insect: {
    width: 60,
    height: 60,
    borderRadius: 25,
    position: 'absolute',
  },
});

export default Insect;
