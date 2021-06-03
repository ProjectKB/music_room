import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Subheading, Divider, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import ShowPlayerContext from '../contexts/ShowPlayerContext';
import SongIndexContext from '../contexts/SongIndexContext';
import PlaylistContext from '../contexts/PlaylistContext';

const PlaylistSongElement = props => {
  const {showPlayer, setShowPlayer} = useContext(ShowPlayerContext);
  const {songIndex, setSongIndex} = useContext(SongIndexContext);
  const {
    playlistDisplayed,
    setPlaylistDisplayed,
    playlistPlayed,
    setPlaylistPlayed,
  } = useContext(PlaylistContext);

  return (
    <>
      <TouchableOpacity
        style={styles.playlistElementContainer}
        onPress={() => {
          if (!showPlayer) {
            setShowPlayer(true);
          }

          setPlaylistPlayed(playlistDisplayed);
          setSongIndex(props.index);
        }}
        onLongPress={() => {
          props.setSongToDeleteIndex(props.index);
          props.setDeletionPlaylistModal(true);
        }}>
        <FontAwesomeIcon size={50} icon={faMusic} />
        <View style={styles.playlistElementContent}>
          <ScrollView horizontal={true} style={{marginHorizontal: 15}}>
            <Subheading>{props.song.name}</Subheading>
          </ScrollView>
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default PlaylistSongElement;

const styles = StyleSheet.create({
  playlistElementContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  playlistElementContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
