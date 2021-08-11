import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {NETWORK} from '@env';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  global.URL = "http://10.18.168.38:8080";//NETWORK;
  global.api_key = "AIzaSyC2Kt0YzhTIXATbXvq77Y-MM2w7q6bmwb4";

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#1a1a1a" />
      <ProtectedRoutes />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
