/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './views/Home';
import Playlist from './views/Playlist';
import SongsList from './views/SongsList';
import Event from './views/Event';
import Search from './views/Search';
import Chat from './views/Chat';
import TabBar from './components/TabBar';
import PlaylistStackHeader from './components/PlaylistStackHeader';
import ShowPlayerContext from './contexts/ShowPlayerContext';
import PlaylistContext from './contexts/PlaylistContext';
import SongIndexContext from './contexts/SongIndexContext';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  
  // global.URL = 'http://192.168.1.65:8080';

  global.URL = 'http://10.18.168.38:8080';
  const [showPlayer, setShowPlayer] = useState(false);
  const [playlistDisplayed, setPlaylistDisplayed] = useState([]);
  const [playlistPlayed, setPlaylistPlayed] = useState([]);
  const [songIndex, setSongIndex] = useState(0);

  const playlistStackNavigation = useCallback(() => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Playlist"
          children={props => (
            <PlaylistContext.Provider
              value={{
                playlistDisplayed,
                setPlaylistDisplayed,
                playlistPlayed,
                setPlaylistPlayed,
              }}>
              <Playlist {...props} />
            </PlaylistContext.Provider>
          )}
          options={{
            title: 'Playlist',
            headerTitle: props => <PlaylistStackHeader navigation={props} />,
          }}
        />
        <Stack.Screen
          name="SongDetails"
          children={props => (
            <PlaylistContext.Provider
              value={{
                playlistDisplayed,
                setPlaylistDisplayed,
                playlistPlayed,
                setPlaylistPlayed,
              }}>
              <ShowPlayerContext.Provider value={{showPlayer, setShowPlayer}}>
                <SongIndexContext.Provider value={{songIndex, setSongIndex}}>
                  <SongsList {...props} />
                </SongIndexContext.Provider>
              </ShowPlayerContext.Provider>
            </PlaylistContext.Provider>
          )}
          options={{
            title: 'Playlist Song',
            headerTitle: props => <PlaylistStackHeader navigation={props} />,
          }}
        />
      </Stack.Navigator>
    );
  }, [playlistDisplayed]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => (
          <PlaylistContext.Provider
            value={{
              playlistDisplayed,
              setPlaylistDisplayed,
              playlistPlayed,
              setPlaylistPlayed,
            }}>
            <ShowPlayerContext.Provider value={{showPlayer, setShowPlayer}}>
              <SongIndexContext.Provider value={{songIndex, setSongIndex}}>
                <TabBar {...props} />
              </SongIndexContext.Provider>
            </ShowPlayerContext.Provider>
          </PlaylistContext.Provider>
        )}
        tabBarPosition="bottom">
        <Tab.Screen name={'Home'} component={Home} />
        <Tab.Screen name={'Playlist'} component={playlistStackNavigation} />
        <Tab.Screen name={'Search'} component={Search} />
        <Tab.Screen name={'Event'} component={Event} />
        <Tab.Screen name={'Chat'} component={Chat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
