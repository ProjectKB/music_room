/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StyleSheet, StatusBar, View, Dimensions} from 'react-native';
import Video from 'react-native-video';
import AppContent from './components/AppContent';

const App = () => {
  const [showApp, setShowApp] = useState(false);

  global.URL = 'http://10.19.1.129:8080';

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#1a1a1a" />
      <Video
        source={require('./assets/video/intro.mp4')}
        style={styles.introVideo}
        onEnd={() => setShowApp(true)}
      />
      <AppContent showApp={showApp} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  introVideo: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 120,
    left: Dimensions.get('window').width / 2 - 134,
    bottom: 0,
    right: 0,
  },
});
