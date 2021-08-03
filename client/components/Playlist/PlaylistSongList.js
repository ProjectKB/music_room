import React from 'react';
import {Text} from 'react-native-paper';
import PlaylistSongElement from './PlaylistSongElement';

const PlaylistSongList = props => {
  const PlaylistSongCollection = () => {
    if (
      props.playlistSongCollection !== undefined &&
      props.playlistSongCollection.length !== 0
    ) {
      return props.playlistSongCollection.map((elem, index) => {
        return (
          <PlaylistSongElement
            key={elem.id}
            song={elem}
            setDeletionPlaylistModal={props.setDeletionPlaylistModal}
            deletionPlaylistModal={props.deletionPlaylistModal}
            setSongToDeleteIndex={props.setSongToDeleteIndex}
            index={index}
            playlist={props.playlist}
            screen={props.screen}
          />
        );
      });
    } else {
      return <Text style={{color: 'white'}}>There is no song here.</Text>;
    }
  };

  return <PlaylistSongCollection />;
};

export default PlaylistSongList;
