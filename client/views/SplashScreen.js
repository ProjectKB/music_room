import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

const SplashScreen = ({retrieveContext}) => {
  return (
    <Video
      source={require('../assets/video/intro.mp4')}
      style={styles.introVideo}
      onEnd={() => retrieveContext()}
    />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  introVideo: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 120,
    left: Dimensions.get('window').width / 2 - 134,
    bottom: 0,
    right: 0,
  },
});
