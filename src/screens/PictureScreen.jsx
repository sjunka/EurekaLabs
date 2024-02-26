import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PictureScreen = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: `file://${photo.image.path}` }} style={styles.image} />
      <Text style={styles.textPosition}>Latitude: {photo.position?.latitude}</Text>
      <Text style={styles.textPosition}>Longitude: {photo.position?.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: '90%',
    height: 300,
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
  textPosition: {
    fontWeight: 'bold',
    fontSize: 20,
    },
});

export default PictureScreen;