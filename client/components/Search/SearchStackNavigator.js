import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../../views/Search';
import PlaylistStackHeader from '../Playlist/PlaylistStackHeader';
import SongsList from '../../views/SongsList';

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  const [deletionPlaylistModal, setDeletionPlaylistModal] = useState(false);
  const [collection, setCollection] = useState([]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        children={props => (
          <Search
            navigation={props.navigation}
            collection={collection}
            setCollection={setCollection}
          />
        )}
        options={{
          title: 'Search',
          headerTitle: props => (
            <PlaylistStackHeader navigation={props} displayAddButton={false} />
          ),
        }}
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
            <PlaylistStackHeader navigation={props} displayAddButton={false} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
