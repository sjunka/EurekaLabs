import React, {useState, useRef, useEffect, useContext, useMemo} from 'react';
import {View, Text, Button, StyleSheet, Alert, Image} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';
import useLocation from '../hooks/useLocation';
import PhotoContext from '../context/PhotoContext';

const TakePictureScreen = ({}) => {
  const camera = useRef(null);
  const {hasPermission, requestPermission} = useCameraPermission();

  const {photos, setPhotos} = useContext(PhotoContext);
  const {location, error} = useLocation();

  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message);
    }
  }, [location]);

  const takePicture = async () => {
    try {
      const result = await camera.current?.takePhoto({
        qualityPrioritization: 'speed',
        flash: 'off',
        enableShutterSound: false,
      });

      if (result && location) {
        const photo = {
          image: result,
          position: location,
        };
        setPhotos(prevPhotos => [...prevPhotos, photo]);
        ShowPictures(photos);
      }
    } catch (e) {
      Alert.alert(`Error: ${e}`);
    }
  };

  const ShowPictures = ({photos}) => {
    return (
      <View style={styles.container}>
        <Text>Photos</Text>
        {photos?.map((photo, index) => {
          return (
            <View key={index}>
              <Image
                source={{uri: `file://${photo.image.path}`}}
                style={styles.image}
              />
            </View>
          );
        })}
      </View>
    );
  };

  useMemo(() => {
    ShowPictures(photos);
  }, [photos]);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Waiting for permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.preview}
        device={device}
        isActive={true}
        photo={true}
      />

      {photos && <ShowPictures photos={photos} />}

      <Button
        title="Take Picture"
        onPress={takePicture}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  image: {
    width: '50%',
    height: 100,
    resizeMode: 'cover',
  },
});

export default TakePictureScreen;
