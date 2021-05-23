import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import PlaylistElement from './PlaylistElement';

const PlaylistsList = props => {
  const PlaylistCollection = () => {
    if (props.playlistCollection.length !== 0) {
      return props.playlistCollection.map(elem => {
        return <PlaylistElement key={elem.id} playlist={elem} />;
      });
    } else {
      return <Text>There is no Playlist here.</Text>;
    }
  };

  return <PlaylistCollection />;
};

export default PlaylistsList;

const styles = StyleSheet.create({});
