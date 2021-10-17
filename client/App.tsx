import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  global.URL = 'http://192.168.0.12:8080';

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
