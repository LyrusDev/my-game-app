// Game.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Ant from '../components/Ant';

interface GameProps {}

const GameScreen: React.FC<GameProps> = () => {
  const [antPosition, setAntPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveAnt = () => {
      const newX = Math.random() * (200 - 50);
      const newY = Math.random() * (600 - 50);
      setAntPosition({ x: newX, y: newY });
    };

    const antMovementInterval = setInterval(() => {
      moveAnt();
    }, 2000);

    return () => clearInterval(antMovementInterval);
  }, []);

  const handleAntPress = () => {
    console.log('Ant crushed!');
  };

  return (
    <View style={styles.container}>
      <Ant position={antPosition} onPress={handleAntPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default GameScreen;
