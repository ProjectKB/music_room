/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Subheading, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';
const PlaylistElement = props => {
  const SongNumber = songNumberProps => {
    const songNumber =
      songNumberProps.playlist.songs !== undefined
        ? songNumberProps.playlist.songs.length
        : 0;
    return songNumber <= 1 ? (
      <Text style={{color: 'white'}}>{songNumber.toString()} song</Text>
    ) : (
      <Text style={{color: 'white'}}>{songNumber.toString()} songs</Text>
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
        <View style={styles.playlistPictureContainer}>
          <FontAwesomeIcon size={50} icon={faMusic} color="white" />
        </View>
        <View style={styles.playlistElementContent}>
          <View style={{marginLeft: 10}}>
            <Subheading style={{color: 'white'}}>
              {props.playlist.name}
            </Subheading>
            <SongNumber playlist={props.playlist} />
          </View>
        </View>
      </TouchableOpacity>
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
  playlistPictureContainer: {
    backgroundColor: '#434243',
    borderRadius: 5,
    marginRight: 5,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
