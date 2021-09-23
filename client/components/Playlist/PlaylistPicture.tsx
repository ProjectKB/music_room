/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';
import {PlaylistType} from '../../Types/Types';

const PlaylistPicture = (playlist: PlaylistType) => {
  if (playlist.songs !== undefined) {
    if (playlist.songs.length < 4) {
      return (
        <Image
          style={styles.playlistPictureContainer}
          source={{uri: playlist.songs[0].picture}}
        />
      );
    } else {
      return (
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              style={[styles.smallPictureDimension, {borderTopLeftRadius: 5}]}
              source={{uri: playlist.songs[0].picture}}
            />
            <Image
              style={[
                styles.smallPictureDimension,
                {borderBottomLeftRadius: 5},
              ]}
              source={{uri: playlist.songs[2].picture}}
            />
          </View>
          <View>
            <Image
              style={[styles.smallPictureDimension, {borderTopRightRadius: 5}]}
              source={{uri: playlist.songs[1].picture}}
            />
            <Image
              style={[
                styles.smallPictureDimension,
                {borderBottomRightRadius: 5},
              ]}
              source={{uri: playlist.songs[3].picture}}
            />
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={styles.playlistPictureContainer}>
        <FontAwesomeIcon size={50} icon={faMusic} color="white" />
      </View>
    );
  }
};

export default PlaylistPicture;

const styles = StyleSheet.create({
  playlistPictureContainer: {
    backgroundColor: '#434243',
    borderRadius: 5,
    marginRight: 5,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallPictureDimension: {
    width: 37.5,
    height: 37.5,
  },
});
