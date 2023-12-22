import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Title } from 'react-native-paper';

export default function ScoreScreen() {
  // Datos de ejemplo: 5 puntuaciones
  const scoresData = [
    { id: '1', name: 'Usuario 1', score: 80 },
    { id: '2', name: 'Usuario 2', score: 95 },
    { id: '3', name: 'Usuario 3', score: 60 },
    { id: '4', name: 'Usuario 4', score: 75 },
    { id: '5', name: 'Usuario 5', score: 88 },
  ];

  const renderItem = ({ item }: any) => (
    <List.Item
      title={item.name}
      description={`Puntuación: ${item.score}`}
      left={(props) => <List.Icon {...props} icon="star" color="#FFD700" />}
      style={styles.containerList}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Title style={styles.title}>Puntuaciones</Title>
      </View>
      <FlatList
        data={scoresData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerList: {
    marginLeft: 16
  },
  containerTitle: {
    marginTop: 80,
    marginBottom: 16,
    marginHorizontal: 26,
    backgroundColor: '#2fb6c340',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  },
});