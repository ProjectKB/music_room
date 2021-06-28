import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../views/Home';
import Event from '../views/Event';
import Chat from '../views/Chat';
import TabBar from '../components/TabBar';
import ShowPlayerContext from '../contexts/ShowPlayerContext';
import PlaylistContext from '../contexts/PlaylistContext';
import SongIndexContext from '../contexts/SongIndexContext';
import FetchContext from '../contexts/FetchContext';
import PlaylistStackNavigator from '../components/Playlist/PlaylistStackNavigator';
import FlashMessage from 'react-native-flash-message';
import SearchStackNavigator from '../components/Search/SearchStackNavigator';

const AppContent = props => {
  const Tab = createMaterialTopTabNavigator();

  const [showPlayer, setShowPlayer] = useState(false);
  const [playlistPlayed, setPlaylistPlayed] = useState([]);
  const [songIndex, setSongIndex] = useState(-1);
  const [mustFetch, setMustFetch] = useState(false);

  if (props.showApp) {
    return (
      <>
        <ShowPlayerContext.Provider value={{showPlayer, setShowPlayer}}>
          <SongIndexContext.Provider value={{songIndex, setSongIndex}}>
            <PlaylistContext.Provider
              value={{playlistPlayed, setPlaylistPlayed}}>
              <FetchContext.Provider value={{mustFetch, setMustFetch}}>
                <NavigationContainer>
                  <Tab.Navigator
                    tabBar={props => <TabBar {...props} />}
                    tabBarPosition="bottom">
                    <Tab.Screen name={'Home'} component={Home} />
                    <Tab.Screen
                      name={'Playlist'}
                      component={PlaylistStackNavigator}
                    />
                    <Tab.Screen
                      name={'Search'}
                      component={SearchStackNavigator}
                    />
                    <Tab.Screen name={'Event'} component={Event} />
                    <Tab.Screen name={'Chat'} component={Chat} />
                  </Tab.Navigator>
                </NavigationContainer>
              </FetchContext.Provider>
            </PlaylistContext.Provider>
          </SongIndexContext.Provider>
        </ShowPlayerContext.Provider>
        <FlashMessage position="top" />
      </>
    );
  } else {
    return null;
  }
};

export default AppContent;
