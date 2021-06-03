/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import PlaylistSongSearchContext from '../contexts/PlaylistSongSearchContext';
import {FetchPlaylistSong} from '../api/PlaylistEndpoint';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import PlaylistSongList from '../components/PlaylistSongList';
import PlaylistContext from '../contexts/PlaylistContext';

const SongsList = ({navigation}) => {
  const [playlistSongCollection, setPlaylistSongCollection] =
    useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const {playlistDisplayed, setPlaylistDisplayed} = useContext(PlaylistContext);

  const fetchPlaylistSong = useCallback(() => {
    if (playlistSongCollection !== undefined) {
      FetchPlaylistSong(
        setPlaylistSongCollection,
        searchQuery,
        playlistDisplayed.id,
      );
    } else {
      setPlaylistSongCollection(playlistDisplayed.songs);
    }
  }, [searchQuery]);

  useEffect(() => {
    navigation.setOptions({title: playlistDisplayed.name});
    fetchPlaylistSong();
  }, [navigation, playlistDisplayed, fetchPlaylistSong]);

  return (
    <PlaylistSongSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <PlaylistSearchBar
        context={PlaylistSongSearchContext}
        modalVisibility={false}
      />
      <ScrollView style={styles.playlistList}>
        <PlaylistSongList
          playlistSongCollection={
            playlistSongCollection === undefined
              ? playlistDisplayed.songs
              : playlistSongCollection
          }
        />
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
