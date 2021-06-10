import React, {useState, useContext, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Playlist from '../../views/Playlist';
import PlaylistStackHeader from './PlaylistStackHeader';
import SongsList from '../../views/SongsList';

const Stack = createStackNavigator();

const PlaylistStackNavigator = () => {
  const [creationPlaylistModal, setCreationPlaylistModal] = useState(false);
  const [deletionPlaylistModal, setDeletionPlaylistModal] = useState(false);
  const [playlistCollection, setPlaylistCollection] = useState([]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Playlist"
        children={props => (
          <Playlist
            navigation={props.navigation}
            creationPlaylistModal={creationPlaylistModal}
            setCreationPlaylistModal={setCreationPlaylistModal}
            deletionPlaylistModal={deletionPlaylistModal}
            setDeletionPlaylistModal={setDeletionPlaylistModal}
            playlistCollection={playlistCollection}
            setPlaylistCollection={setPlaylistCollection}
          />
        )}
        options={{
          title: 'Playlist',
          headerTitle: props => (
            <PlaylistStackHeader
              navigation={props}
              addAction={() => {
                if (!deletionPlaylistModal) {
                  setCreationPlaylistModal(true);
                }
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SongDetails"
        children={props => (
          <SongsList
            navigation={props.navigation}
            deletionPlaylistModal={deletionPlaylistModal}
            setDeletionPlaylistModal={setDeletionPlaylistModal}
            playlistCollection={playlistCollection}
            setPlaylistCollection={setPlaylistCollection}
          />
        )}
        options={{
          title: 'Playlist Song',
          headerTitle: props => (
            <PlaylistStackHeader navigation={props} displayAddButton={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default PlaylistStackNavigator;

const styles = StyleSheet.create({});
