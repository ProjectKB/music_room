import React, {useState, useCallback, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Headline} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay, faPause, faStop} from '@fortawesome/free-solid-svg-icons';
import TextTicker from 'react-native-text-ticker';

const playlist = [
  {videoId: '668nUCeBHyY', name: 'Nature Beautiful short video 720p HD'},
  {videoId: 'iee2TATGMyI', name: 'This is a title'},
  {
    videoId: '-qYS3xJ-7DQ',
    name: 'Nouveau Renault Arkana – hybride par nature | Publicité | Renault',
  },
];

const Player = () => {
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('iee2TATGMyI');

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setCurrentSong('VYOjWnS4cMY');
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const songPlayerButton = playing ? (
    <FontAwesomeIcon size={25} icon={faPause} />
  ) : (
    <FontAwesomeIcon size={25} icon={faPlay} />
  );

  return (
    <View>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={currentSong}
        onReady={() => setPlaying(true)}
        onChangeState={onStateChange}
      />

      <View style={styles.songPlayerContainer}>
        <View style={styles.songPlayerPicture} />
        <View style={styles.songPLayerTitle}>
          <TextTicker
            style={{fontSize: 16}}
            duration={10000}
            loop
            scroll={false}
            repeatSpacer={50}
            marqueeDelay={1000}>
            Nouveau Renault Arkana – hybride par nature | Publicité | Renault
          </TextTicker>
        </View>
        <TouchableOpacity
          style={styles.songPLayerButton}
          onPress={togglePlaying}>
          {songPlayerButton}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  songPlayerContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDD85C',
  },
  songPlayerPicture: {
    height: 50,
    width: 50,
    justifyContent: 'flex-end',
    backgroundColor: 'grey',
    flex: 1,
  },
  songPLayerTitle: {
    paddingHorizontal: 10,
    flex: 7,
  },
  songPLayerButton: {
    flex: 1,
    alignItems: 'center',
  },
});
