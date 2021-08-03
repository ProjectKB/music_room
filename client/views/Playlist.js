/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBar from '../components/SearchBar';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistContent from '../components/Playlist/PlaylistContent';
import FetchContext from '../contexts/FetchContext';

const Playlist = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlistIndex, setPlaylistIndex] = useState(undefined);

  const {mustFetch, setMustFetch} = useContext(FetchContext);

  const fetchPlaylist = useCallback(() => {
    FetchPlaylistList(props.setPlaylistCollection, searchQuery, 'playlist');

    if (mustFetch) {
      setMustFetch(false);
    }
  }, [searchQuery, mustFetch]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  return (
    <View style={styles.mainContainer}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <PlaylistContent
        navigation={props.navigation}
        playlistCollection={props.playlistCollection}
        setPlaylistCollection={props.setPlaylistCollection}
        creationPlaylistModal={props.creationPlaylistModal}
        setCreationPlaylistModal={props.setCreationPlaylistModal}
        multiPlaylistModal={props.multiPlaylistModal}
        setMultiPlaylistModal={props.setMultiPlaylistModal}
        playlistIndex={playlistIndex}
        setPlaylistIndex={setPlaylistIndex}
      />
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1a1a1a',
    flex: 1,
  },
});
