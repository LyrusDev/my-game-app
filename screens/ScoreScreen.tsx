import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Title } from 'react-native-paper';
import { ref, onValue } from 'firebase/database'
import { db } from '../helpers/ConfigDB';

export default function ScoreScreen() {
  const [listData, setListData] = useState([])

  const onDataList = () => {
    onValue(ref(db, 'users/'), (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      setListData(dataArray)
    });
  }

  useEffect(() => {
    onDataList()
  },[]);

  const renderItem = ({ item }: any) => (
    <List.Item
      title={item.nick}
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
        data={listData}
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