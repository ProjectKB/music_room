import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import PlaylistSongElement from './PlaylistSongElement';

const PlaylistSongList = props => {
  const PlaylistSongCollection = () => {
    if (props.playlistSongCollection.length !== 0) {
      return props.playlistSongCollection.map(elem => {
        return <PlaylistSongElement key={elem.id} song={elem} />;
      });
    } else {
      return <Text>There is no song here.</Text>;
    }
  };

  return <PlaylistSongCollection />;
};

export default PlaylistSongList;

const styles = StyleSheet.create({});
