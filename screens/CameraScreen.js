import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef) {
      try {
        const pic = await cameraRef.takePictureAsync();
        setPhoto(pic);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo.uri }} style={styles.previewImage} />
      ) : (
        <Camera 
          style={styles.cameraView} 
          type={Camera.Constants.Type.back} 
          ref={ref => setCameraRef(ref)}
        />
      )}
      <View style={styles.buttonContainer}>
        {photo ? (
          <>
            <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={() => {/* 마모도 측정 로직 */}}>
              <Text style={styles.buttonText}>마모도 측정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.liveButton]} onPress={() => setPhoto(null)}>
              <Text style={styles.buttonText}>다시 찍기</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={handleTakePicture}>
            <Text style={styles.buttonText}>사진 촬영</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cameraView: {
      flex: 1,
      width: '100%',
    },
    previewImage: {
      flex: 1,
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    button: {
        flex: 1,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        marginHorizontal: 5,
    },
    uploadButton: {
        borderColor: '#4CAF50',
        borderWidth: 2,
    },
    liveButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
});
