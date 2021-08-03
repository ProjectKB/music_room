import React from 'react';
import {Text} from 'react-native-paper';
import PlaylistElement from './PlaylistElement';
const PlaylistList = props => {
  const PlaylistCollection = () => {
    if (
      props.playlistCollection.length === 0 ||
      (props.screen === 'Search' && props.searchQuery === '')
    ) {
      return <Text style={{color: 'white'}}>There is no playlist here.</Text>;
    } else {
      return props.playlistCollection.map((elem, index) => {
        return (
          <PlaylistElement
            key={elem.id}
            playlist={elem}
            navigation={props.navigation}
            setDeletionPlaylistModal={props.setDeletionPlaylistModal}
            setPlaylistToDeleteIndex={props.setPlaylistToDeleteIndex}
            index={index}
            screen={props.screen}
          />
        );
      });
    }
  };

  return <PlaylistCollection />;
};
export default PlaylistList;
