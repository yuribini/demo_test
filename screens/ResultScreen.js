import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen() {
  // 예시로 75% 마모도를 표시
  const wearPercentage = 75;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>타이어 마모도 결과</Text>
      <View style={styles.barContainer}>
        <View style={{...styles.progressBar, width: `${wearPercentage}%`}}></View>
      </View>
      <Text style={styles.percentage}>{wearPercentage}%</Text>
      <Text style={styles.advice}>
        {wearPercentage > 70 ? "타이어 교체를 고려해보세요!" : "타이어 상태가 양호합니다!"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
  },
  barContainer: {
    width: '100%',
    height: 30,
    backgroundColor: '#4B4B4B',
    borderRadius: 15,
    marginBottom: 20,
  },
  progressBar: {
    height: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
  },
  percentage: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  advice: {
    fontSize: 18,
    color: 'white',
  },
});
