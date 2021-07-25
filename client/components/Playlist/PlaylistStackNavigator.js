import React, {useState} from 'react';
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
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTitle: props => (
            <PlaylistStackHeader
              navigation={props}
              displayAddButton={true}
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
            playlist={props.route.params.playlist}
            playlistCollection={playlistCollection}
            setPlaylistCollection={setPlaylistCollection}
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
    </Stack.Navigator>
  );
};

export default PlaylistStackNavigator;