import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchSong from './SearchSong';
import PlaylistContent from '../Playlist/PlaylistContent';

const SearchElementList = props => {
  if (props.chipSelected === 'Song') {
    return (
      <SearchSong
        collection={props.collection}
        setCollection={props.setCollection}
        setMaxResults={props.setMaxResults}
      />
    );
  } else if (props.chipSelected === 'Playlist') {
    return (
      <PlaylistContent
        navigation={props.navigation}
        playlistCollection={props.collection}
        setPlaylistCollection={props.setCollection}
        deletionPlaylistModal={props.deletionPlaylistModal}
        setDeletionPlaylistModal={props.setDeletionPlaylistModal}
      />
    );
  } else {
    return null;
  }
};

export default SearchElementList;

const styles = StyleSheet.create({});
