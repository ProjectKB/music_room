import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Subheading, Divider} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';
import ShowPlayerContext from '../../contexts/ShowPlayerContext';
import SongIndexContext from '../../contexts/SongIndexContext';
import PlaylistContext from '../../contexts/PlaylistContext';

const PlaylistSongElement = props => {
  const {showPlayer, setShowPlayer} = useContext(ShowPlayerContext);
  const {setSongIndex} = useContext(SongIndexContext);
  const {setPlaylistPlayed} = useContext(PlaylistContext);

  return (
    <>
      <TouchableOpacity
        style={styles.playlistElementContainer}
        onPress={() => {
          if (!showPlayer) {
            setShowPlayer(true);
          }

          setPlaylistPlayed(props.playlist);
          setSongIndex(props.index);
        }}
        onLongPress={() => {
          props.setSongToDeleteIndex(props.index);
          props.setDeletionPlaylistModal(true);
        }}>
        <View style={styles.playlistPictureContainer}>
          <FontAwesomeIcon size={50} icon={faMusic} color="white" />
        </View>
        <View style={styles.playlistElementContent}>
          <ScrollView horizontal={true} style={{marginHorizontal: 15}}>
            <Subheading style={{color: 'white'}} >{props.song.name}</Subheading>
          </ScrollView>
        </View>
      </TouchableOpacity>
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
  playlistPictureContainer: {
    backgroundColor: '#434243',
    borderRadius: 5,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
