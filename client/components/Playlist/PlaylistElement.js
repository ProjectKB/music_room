/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Subheading, Divider, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons';

const PlaylistElement = props => {
  const {
    playlistDisplayed,
    setPlaylistDisplayed,
    playlistPlayed,
    setPlaylistPlayed,
  } = useContext(PlaylistContext);

  const SongNumber = songNumberProps => {
    const songNumber =
      songNumberProps.playlist.songs !== undefined
        ? songNumberProps.playlist.songs.length
        : 0;

    return songNumber <= 1 ? (
      <Text>{songNumber.toString()} song</Text>
    ) : (
      <Text>{songNumber.toString()} songs</Text>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.playlistElementContainer}
        onPress={() =>
          props.navigation.navigate('SongDetails', {playlist: props.playlist})
        }
        onLongPress={() => {
          props.setPlaylistToDeleteIndex(props.index);
          props.setDeletionPlaylistModal(true);
        }}>
        <FontAwesomeIcon size={70} icon={faCameraRetro} />
        <View style={styles.playlistElementContent}>
          <View style={{marginLeft: 10}}>
            <Subheading>{props.playlist.name}</Subheading>
            <SongNumber playlist={props.playlist} />
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default PlaylistElement;

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
