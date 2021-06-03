import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import PlaylistElement from './PlaylistElement';

const PlaylistList = props => {
  const PlaylistCollection = () => {
    if (props.playlistCollection.length !== 0) {
      return props.playlistCollection.map((elem, index) => {
        return (
          <PlaylistElement
            key={elem.id}
            playlist={elem}
            navigation={props.navigation}
            setDeletionPlaylistModal={props.setDeletionPlaylistModal}
            setPlaylistToDeleteIndex={props.setPlaylistToDeleteIndex}
            index={index}
          />
        );
      });
    } else {
      return <Text>There is no playlist here.</Text>;
    }
  };

  return <PlaylistCollection />;
};

export default PlaylistList;

const styles = StyleSheet.create({});
