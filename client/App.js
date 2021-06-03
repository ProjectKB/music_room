/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './views/Home';
import Event from './views/Event';
import Search from './views/Search';
import Chat from './views/Chat';
import TabBar from './components/TabBar';
import ShowPlayerContext from './contexts/ShowPlayerContext';
import PlaylistContext from './contexts/PlaylistContext';
import SongIndexContext from './contexts/SongIndexContext';
import PlaylistStackNavigator from './components/PlaylistStackNavigator';

const Tab = createMaterialTopTabNavigator();

const App = () => {
  
  // global.URL = 'http://192.168.1.65:8080';

  global.URL = 'http://10.18.168.38:8080';
  const [showPlayer, setShowPlayer] = useState(false);
  const [playlistDisplayed, setPlaylistDisplayed] = useState([]);
  const [playlistPlayed, setPlaylistPlayed] = useState([]);
  const [songIndex, setSongIndex] = useState(0);

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
        <Tab.Screen
          name={'Playlist'}
          children={() => (
            <PlaylistContext.Provider
              value={{
                playlistDisplayed,
                setPlaylistDisplayed,
                playlistPlayed,
                setPlaylistPlayed,
              }}>
              <ShowPlayerContext.Provider value={{showPlayer, setShowPlayer}}>
                <SongIndexContext.Provider value={{songIndex, setSongIndex}}>
                  <PlaylistStackNavigator />
                </SongIndexContext.Provider>
              </ShowPlayerContext.Provider>
            </PlaylistContext.Provider>
          )}
        />
        <Tab.Screen name={'Search'} component={Search} />
        <Tab.Screen name={'Event'} component={Event} />
        <Tab.Screen name={'Chat'} component={Chat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
