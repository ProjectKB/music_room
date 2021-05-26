import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import PlaylistSongSearchContext from '../contexts/PlaylistSongSearchContext';
import {FetchPlaylistSong} from '../api/PlaylistEndpoint';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import PlaylistSongList from '../components/PlaylistSongList';

const SongsList = ({navigation, route}) => {
  const [playlistSongCollection, setPlaylistSongCollection] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [playlist, setPlaylist] = useState(route.params.playlist);

  const fetchPlaylistSong = useCallback(() => {
    FetchPlaylistSong(setPlaylistSongCollection, searchQuery, playlist.id);
  }, [searchQuery, playlist.id]);

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
