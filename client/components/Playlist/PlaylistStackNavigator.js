import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Playlist from '../../views/Playlist';
import PlaylistStackHeader from './PlaylistStackHeader';
import SongsList from '../../views/SongsList';
import EditPlaylist from '../../views/EditPlaylist';

const Stack = createStackNavigator();

const PlaylistStackNavigator = () => {
  const [creationPlaylistModal, setCreationPlaylistModal] = useState(false);
  const [multiPlaylistModal, setMultiPlaylistModal] = useState(false);
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
            multiPlaylistModal={multiPlaylistModal}
            setMultiPlaylistModal={setMultiPlaylistModal}
            playlistCollection={playlistCollection}
            setPlaylistCollection={setPlaylistCollection}
          />
        )}
        options={{
          title: 'Playlist',
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTitle: props => (
            <PlaylistStackHeader
              navigation={props}
              displayAddButton={true}
              addAction={() => {
                if (!multiPlaylistModal) {
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
            playlist={props.route.params.playlist}
            playlistCollection={playlistCollection}
            setPlaylistCollection={setPlaylistCollection}
            screen="Playlist"
          />
        )}
        options={{
          title: 'Playlist Song',
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTintColor: 'white',
          headerTitle: props => (
            <PlaylistStackHeader navigation={props} displayAddButton={false} />
          ),
        }}
      />
      <Stack.Screen
        name="EditPlaylist"
        children={props => (
          <EditPlaylist
            navigation={props.navigation}
            playlist={props.route.params.playlist}
          />
        )}
        options={{
          title: 'Edit Playlist',
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTintColor: 'white',
          headerTitle: props => (
            <PlaylistStackHeader navigation={props} displayAddButton={false} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default PlaylistStackNavigator;
