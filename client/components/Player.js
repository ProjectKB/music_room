/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay, faPause, faMusic} from '@fortawesome/free-solid-svg-icons';
import TextTicker from 'react-native-text-ticker';
import PlaylistContext from '../contexts/PlaylistContext';
import SongIndexContext from '../contexts/SongIndexContext';
import ShowPlayerContext from '../contexts/ShowPlayerContext';
import PlayerDetails from './PlayerDetails';
import PlayPauseButton from './PlayPauseButton';

const Player = () => {
  const {
    playlistDisplayed,
    setPlaylistDisplayed,
    playlistPlayed,
    setPlaylistPlayed,
  } = useContext(PlaylistContext);

  const {songIndex, setSongIndex} = useContext(SongIndexContext);
  const {showPlayer, setShowPlayer} = useContext(ShowPlayerContext);

  const [playing, setPlaying] = useState(false);

  const [currentSong, setCurrentSong] = useState(
    playlistPlayed.songs[songIndex].id,
  );

  const [songState, setSongState] = useState('undefined');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressionBarValue, setProgressionBarValue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const onStateChange = useCallback(
    state => {
      if (state === 'ended') {
        if (songIndex !== playlistPlayed.songs.length - 1) {
          setCurrentSong(playlistPlayed.songs[songIndex + 1].id);
          setSongIndex(songIndex + 1);
        }

        setProgressionBarValue(1);
        setPlaying(false);
      }
      setSongState(state);
    },
    [playlistPlayed, songIndex, setSongIndex],
  );

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const playerRef = useRef();

  useEffect(() => {
    if (songState === 'playing') {
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
    } else if (songState === 'unstarted' || songState === 'buffering') {
      setCurrentTime(0);
      setProgressionBarValue(0);
    }
  }, [currentTime, duration, songState]);

  useEffect(() => {
    setPlaying(false);
    setCurrentSong(playlistPlayed.songs[songIndex].id);
    setSongIndex(songIndex);
  }, [playlistPlayed, songIndex, setSongIndex]);

  return (
    <View>
      <PlayerDetails
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        progressionBarValue={progressionBarValue}
        currentTime={currentTime}
        duration={duration}
        songState={songState}
        playing={playing}
        setPlaying={setPlaying}
        index={songIndex}
        setIndex={setSongIndex}
        songName={playlistPlayed.songs[songIndex].name}
        setCurrentSong={setCurrentSong}
      />
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
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <ProgressBar progress={progressionBarValue} color="#806851" />
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
              {playlistPlayed.songs[songIndex].name}
            </TextTicker>
          </View>
          <TouchableOpacity
            style={styles.songPLayerButton}
            onPress={togglePlaying}>
            <PlayPauseButton
              color="white"
              size={20}
              songState={songState}
              faTrue={faPlay}
              faFalse={faPause}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
