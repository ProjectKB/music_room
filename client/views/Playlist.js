import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import PlaylistList from '../components/PlaylistList';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistListSearchContext from '../contexts/PlaylistListSearchContext';
import PlaylistCreationModal from '../components/PlaylistCreationModal';
import PlaylistCreationModalContext from '../contexts/PlaylistCreationModalContext';

const Playlist = props => {
  const [playlistCollection, setPlaylistCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlaylist = useCallback(() => {
    FetchPlaylistList(setPlaylistCollection, searchQuery);
  }, [searchQuery]);

  const {modalVisibility, setModalVisibility} = useContext(
    PlaylistCreationModalContext,
  );

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  return (
    <PlaylistListSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <PlaylistSearchBar
        context={PlaylistListSearchContext}
        modalVisibility={modalVisibility}
      />
      <ScrollView style={styles.playlistList}>
        <PlaylistList
          playlistCollection={playlistCollection}
          navigation={props.navigation}
        />
      </ScrollView>
      <PlaylistCreationModal />
    </PlaylistListSearchContext.Provider>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
});
