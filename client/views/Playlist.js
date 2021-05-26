import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import PlaylistList from '../components/PlaylistList';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistListSearchContext from '../contexts/PlaylistListSearchContext';

const Playlist = ({navigation}) => {
  const [playlistCollection, setPlaylistCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlaylist = useCallback(() => {
    FetchPlaylistList(setPlaylistCollection, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  return (
    <PlaylistListSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <PlaylistSearchBar context={PlaylistListSearchContext} />
      <ScrollView style={styles.playlistList}>
        <PlaylistList
          playlistCollection={playlistCollection}
          navigation={navigation}
        />
      </ScrollView>
    </PlaylistListSearchContext.Provider>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
});
