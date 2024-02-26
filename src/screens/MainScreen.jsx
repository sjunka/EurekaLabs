import React, {useContext} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PhotoContext from '../context/PhotoContext';

const MainScreen = ({navigation}) => {
  const {photos} = useContext(PhotoContext);

  const renderItem = ({item}) => {
    return (
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
  };

  if (photos.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Data</Text>
        <Button
          title="Take Picture"
          onPress={() => navigation.navigate('TakePicture')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />

      <Button
        title="Take Picture"
        onPress={() => navigation.navigate('TakePicture')}
        style={styles.buttonCapture}
      />
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
  item: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  buttonCapture: {
    margin: 10,
  },
});

export default MainScreen;
