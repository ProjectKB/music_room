/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronDown,
  faPlayCircle,
  faPauseCircle,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import {Headline, ProgressBar, Subheading} from 'react-native-paper';
import PlaylistContext from '../../contexts/PlaylistContext';
import AnimatedText from '../AnimatedText';
import PlayPauseButton from './PlayPauseButton';

const PlayerDetails = props => {
  const [modalVisible, setModalVisible] = [
    props.modalVisible,
    props.setModalVisible,
  ];

  const [playing, setPlaying] = [props.playing, props.setPlaying];
  const [index, setIndex] = [props.index, props.setIndex];

  const {playlistPlayed} = useContext(PlaylistContext);

  const displayTime = toConvert => {
    let h = Math.trunc(toConvert / 3600);
    let m = Math.trunc(toConvert / 60);
    let s = Math.trunc(toConvert % 60);

    if (s < 10) {
      s = `0${s}`;
    }

    return h ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  const nextSong = () => {
    if (index + 1 !== playlistPlayed.songs.length) {
      props.setCurrentSong(playlistPlayed.songs[index + 1].id);
      setIndex(index + 1);
      setPlaying(false);
    }
  };

  const prevSong = () => {
    if (index !== 0) {
      props.setCurrentSong(playlistPlayed.songs[index - 1].id);
      setIndex(index - 1);
      setPlaying(false);
    }
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.playerDetailsHeaderContainer}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <FontAwesomeIcon color="white" size={20} icon={faChevronDown} />
        </TouchableOpacity>
      </View>
      <View style={styles.pictureContainer}>
        <View style={styles.pictureSize} />
      </View>
      <View style={styles.playerActionContainer}>
        <View style={styles.playerDetailsText}>
          <AnimatedText
            text={<Headline style={styles.songName}>{props.songName}</Headline>}
            callback={props.songName}
          />
          <AnimatedText
            text={
              <Subheading style={{color: 'white'}}>
                {playlistPlayed.name}
              </Subheading>
            }
            callback={playlistPlayed.name}
          />
        </View>
        <ProgressBar
          style={{marginTop: 10}}
          progress={props.progressionBarValue}
          color="white"
        />
        <View style={styles.progressBarTime}>
          <Text style={{color: 'white'}}>{displayTime(props.currentTime)}</Text>
          <Text style={{color: 'white'}}>{displayTime(props.duration)}</Text>
        </View>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity onPress={prevSong}>
            <FontAwesomeIcon color="white" size={40} icon={faStepBackward} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 20}}
            onPress={() => setPlaying(!playing)}>
            <PlayPauseButton
              color="white"
              size={70}
              songState={props.songState}
              faTrue={faPlayCircle}
              faFalse={faPauseCircle}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextSong}>
            <FontAwesomeIcon color="white" size={40} icon={faStepForward} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PlayerDetails;

const styles = StyleSheet.create({
  playerDetailsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#383839',
    padding: 15,
  },
  pictureContainer: {
    flex: 4,
    backgroundColor: '#383839',
    padding: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  playerDetailsText: {
    paddingVertical: 10,
  },
  pictureSize: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
    backgroundColor: '#292929',
  },
  playerActionContainer: {
    flex: 3,
    paddingHorizontal: 40,
    backgroundColor: '#383839',
  },
  progressBarTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songName: {
    fontWeight: 'bold',
    marginBottom: -5,
    color: 'white',
  },
});
