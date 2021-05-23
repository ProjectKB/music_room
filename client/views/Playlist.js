import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import PlaylistList from '../components/PlaylistList';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import {ReadAllPlaylist} from '../api/PlaylistEndpoint';

{
  /* <Button
  title="Go to Details"
  onPress={() => navigation.navigate('SongDetails')}
/>; */
}

const Playlist = ({navigation}) => {
  const [playlistCollection, setPlaylistCollection] = useState([]);

  const fetchPlaylists = useCallback(() => {
    ReadAllPlaylist(setPlaylistCollection);
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <>
      <PlaylistSearchBar />
      <ScrollView style={styles.playlistList}>
        <PlaylistList playlistCollection={playlistCollection} />
      </ScrollView>
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
});
