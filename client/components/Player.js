import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay, faPause, faMusic} from '@fortawesome/free-solid-svg-icons';
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
  const [songState, setSongState] = useState('undefined');
  const [currentSong, setCurrentSong] = useState('iee2TATGMyI');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressionBarValue, setProgressionBarValue] = useState(0);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setCurrentSong('VYOjWnS4cMY');
      setPlaying(false);
    }
    setSongState(state);
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const playerRef = useRef();

  const songPlayerButton = playing ? (
    <FontAwesomeIcon color="white" size={20} icon={faPause} />
  ) : (
    <FontAwesomeIcon color="white" size={20} icon={faPlay} />
  );

  useEffect(() => {
    if (songState !== 'paused') {
      const interval = setInterval(() => {
        playerRef.current
          ?.getCurrentTime()
          .then(getSongTime => setCurrentTime(getSongTime));
        playerRef.current
          ?.getDuration()
          .then(getDuration => setDuration(getDuration));

        const songProgression = currentTime / duration;

        !isNaN(songProgression) && isFinite(songProgression)
          ? setProgressionBarValue(songProgression)
          : setProgressionBarValue(0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTime, duration, songState]);

  return (
    <View style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
      <View>
        <View style={{opacity: 0}}>
          <YoutubePlayer
            ref={playerRef}
            height={1}
            play={playing}
            videoId={currentSong}
            onReady={() => {
              setPlaying(true);
            }}
            onChangeState={onStateChange}
          />
        </View>

        <View>
          <ProgressBar progress={progressionBarValue} color="#685a5e" />
          <View style={styles.songPlayerContainer}>
            <View style={styles.songPlayerPicture}>
              <FontAwesomeIcon color="white" size={20} icon={faMusic} />
            </View>
            <View style={styles.songPLayerTitle}>
              <TextTicker
                style={styles.songPlayerTitleFont}
                duration={10000}
                loop
                scroll={false}
                repeatSpacer={50}
                marqueeDelay={1000}>
                Childish Gambino - This is America - Oh no I'm too long !
              </TextTicker>
            </View>
            <TouchableOpacity
              style={styles.songPLayerButton}
              onPress={togglePlaying}>
              {songPlayerButton}
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#77656a',
  },
  songPlayerPicture: {
    height: 50,
    width: 50,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c3132',
    flex: 1,
  },
  songPLayerTitle: {
    paddingHorizontal: 10,
    flex: 7,
  },
  songPlayerTitleFont: {
    fontSize: 16,
    color: 'white',
  },
  songPLayerButton: {
    flex: 1,
    alignItems: 'center',
  },
});
