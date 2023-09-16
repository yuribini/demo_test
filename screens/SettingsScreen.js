import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>설정 및 도움말</Text>
      <View style={styles.card}>
        <Text style={styles.cardHeader}>마모도 측정 팁</Text>
        <Text style={styles.cardText}>- 타이어의 깨끗한 부분을 촬영하세요.</Text>
        <Text style={styles.cardText}>- 직접 빛이 들어오는 곳에서 촬영하는 것이 좋습니다.</Text>
      </View>
      {/* 추가적인 설정 및 도움말 카드를 여기에 추가할 수 있습니다. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#3F3F3F',
    borderRadius: 10,
    marginBottom: 20,
  },
  cardHeader: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
});
