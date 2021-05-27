import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import PlaylistSongSearchContext from '../contexts/PlaylistSongSearchContext';
import {FetchPlaylistSong} from '../api/PlaylistEndpoint';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import PlaylistSongList from '../components/PlaylistSongList';
import PlaylistContext from '../contexts/PlaylistContext';

const SongsList = ({navigation}) => {
  const [playlistSongCollection, setPlaylistSongCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {playlist, setPlaylist} = useContext(PlaylistContext);

  const fetchPlaylistSong = useCallback(() => {
    FetchPlaylistSong(setPlaylistSongCollection, searchQuery, playlist.id);
  }, [searchQuery, playlist]);

  useEffect(() => {
    navigation.setOptions({title: playlist.name});
    fetchPlaylistSong();
  }, [navigation, playlist, fetchPlaylistSong]);

  return (
    <PlaylistSongSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <PlaylistSearchBar context={PlaylistSongSearchContext} />
      <ScrollView style={styles.playlistList}>
        <PlaylistSongList playlistSongCollection={playlistSongCollection} />
      </ScrollView>
    </PlaylistSongSearchContext.Provider>
  );
};

export default SongsList;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
});
