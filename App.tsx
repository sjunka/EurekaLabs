// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import MainScreen from './src/screens/MainScreen';
import TakePictureScreen from './src/screens/TakePictureScreen';
import PictureScreen from './src/screens/PictureScreen';
import PhotoProvider from './src/context/PhotoProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PhotoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              title: 'Photo APP',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen name="TakePicture" component={TakePictureScreen} />
          <Stack.Screen name="Picture" component={PictureScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PhotoProvider>
  );
}
