import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ReadAllPlaylist} from '../api/PlaylistEndpoint';
import PlaylistElement from './PlaylistElement';

const PlaylistsList = () => {
  const [playlistCollection, setPlaylistCollection] = useState([]);

  const fetchPlaylists = useCallback(() => {
    ReadAllPlaylist(setPlaylistCollection);
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const PlaylistCollection = () => {
    if (playlistCollection.length !== 0) {
      return playlistCollection.map(elem => {
        return <PlaylistElement key={elem.id} playlist={elem} />;
      });
    } else {
      return <Text>There is no Playlist here.</Text>;
    }
  };

  return (
    <View>
      <PlaylistCollection />
    </View>
  );
};

export default PlaylistsList;

const styles = StyleSheet.create({});
