import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../views/Search';
import PlaylistStackHeader from '../Playlist/PlaylistStackHeader';
import SongsList from '../../views/SongsList';

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  const [creationPlaylistModal, setCreationPlaylistModal] = useState(false);
  const [deletionPlaylistModal, setDeletionPlaylistModal] = useState(false);
  const [collection, setCollection] = useState([]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        children={props => (
          <Search
            navigation={props.navigation}
            creationPlaylistModal={creationPlaylistModal}
            setCreationPlaylistModal={setCreationPlaylistModal}
            deletionPlaylistModal={deletionPlaylistModal}
            setDeletionPlaylistModal={setDeletionPlaylistModal}
            collection={collection}
            setCollection={setCollection}
          />
        )}
      />
      <Stack.Screen
        name="SongDetails"
        children={props => (
          <SongsList
            navigation={props.navigation}
            playlist={props.route.params.playlist}
            deletionPlaylistModal={deletionPlaylistModal}
            setDeletionPlaylistModal={setDeletionPlaylistModal}
            playlistCollection={collection}
            setPlaylistCollection={setCollection}
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

export default SearchStackNavigator;
