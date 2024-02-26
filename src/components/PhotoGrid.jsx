// components/PhotoGrid.js
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const PhotoGrid = ({ photos }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
          onPress={() => navigation.navigate('Picture', {photo: item})}>
          <Image
            source={{uri: `file://${item.image.path}`}}
            style={styles.image}
          />
          <Text>Latitude: {item.position?.latitude}</Text>
          <Text>Longitude: {item.position?.longitude}</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3} 
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  label: {
    marginTop: 5,
  },
});

export default PhotoGrid;