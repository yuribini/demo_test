import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🤖 AI 타이어 앱</Text>
      <Text style={styles.description}>타이어의 마모도를 AI로 확인하세요!</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>사진 촬영 및 업로드</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.liveButton} onPress={() => {}}>
        <Text style={styles.buttonText}>실시간 측정 시작</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Result')}>
        <Text style={styles.navButtonText}>측정 결과 기록</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.navButtonText}>마모도 측정 팁</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#D6D6D6',
    textAlign: 'center',
    marginBottom: 40,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    elevation: 5,
  },
  liveButton: {
    backgroundColor: '#FFC107',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navButton: {
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  navButtonText: {
    color: 'white',
  },
});
