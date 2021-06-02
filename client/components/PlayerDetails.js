import React, {useContext} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronDown,
  faEllipsisV,
  faPlayCircle,
  faPauseCircle,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import {Headline, ProgressBar, Subheading} from 'react-native-paper';
import PlaylistContext from '../contexts/PlaylistContext';
import AnimatedText from './AnimatedText';
import SongIndexContext from '../contexts/SongIndexContext';
import PlayPauseButton from './PlayPauseButton';

const PlayerDetails = props => {
  const [modalVisible, setModalVisible] = [
    props.modalVisible,
    props.setModalVisible,
  ];

  const [playing, setPlaying] = [props.playing, props.setPlaying];
  const [index, setIndex] = [props.index, props.setIndex];

  const {
    playlistDisplayed,
    setPlaylistDisplayed,
    playlistPlayed,
    setPlaylistPlayed,
  } = useContext(PlaylistContext);

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
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.playerDetailsHeaderContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <FontAwesomeIcon size={20} icon={faChevronDown} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon size={20} icon={faEllipsisV} />
          </TouchableOpacity>
        </View>
        <View style={styles.pictureContainer}>
          <View style={styles.pictureSize} />
        </View>
        <View style={styles.playerActionContainer}>
          <View style={styles.playerDetailsText}>
            <AnimatedText
              text={
                <Headline style={{fontWeight: 'bold', marginBottom: -5}}>
                  {props.songName}
                </Headline>
              }
              callback={props.songName}
            />
            <AnimatedText
              text={<Subheading>{playlistPlayed.name}</Subheading>}
              callback={playlistPlayed.name}
            />
          </View>
          <ProgressBar
            style={{marginTop: 10}}
            progress={props.progressionBarValue}
          />
          <View style={styles.progressBarTime}>
            <Text>{displayTime(props.currentTime)}</Text>
            <Text>{displayTime(props.duration)}</Text>
          </View>
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity onPress={prevSong}>
              <FontAwesomeIcon size={40} icon={faStepBackward} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 20}}
              onPress={() => setPlaying(!playing)}>
              <PlayPauseButton
                color="black"
                size={70}
                songState={props.songState}
                faTrue={faPlayCircle}
                faFalse={faPauseCircle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={nextSong}>
              <FontAwesomeIcon size={40} icon={faStepForward} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlayerDetails;

const styles = StyleSheet.create({
  playerDetailsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    padding: 15,
  },
  pictureContainer: {
    flex: 4,
    backgroundColor: 'lightblue',
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
    backgroundColor: 'darkblue',
  },
  playerActionContainer: {
    flex: 3,
    paddingHorizontal: 40,
    backgroundColor: 'lightblue',
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
});
