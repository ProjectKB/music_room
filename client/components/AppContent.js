import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../views/Home';
import Event from '../views/Event';
import Chat from '../views/Chat';
import TabBar from '../components/TabBar';
import ShowPlayerContext from '../contexts/ShowPlayerContext';
import PlaylistContext from '../contexts/PlaylistContext';
import SongIndexContext from '../contexts/SongIndexContext';
import FetchContext from '../contexts/FetchContext';
import UserContext from '../contexts/UserContext';
import PlaylistStackNavigator from '../components/Playlist/PlaylistStackNavigator';
import FlashMessage from 'react-native-flash-message';
import SearchStackNavigator from '../components/Search/SearchStackNavigator';
import {DefineUser} from '../api/AuthEndpoint';

const AppContent = () => {
  const Tab = createMaterialTopTabNavigator();

  const [showPlayer, setShowPlayer] = useState(false);
  const [playlistPlayed, setPlaylistPlayed] = useState([]);
  const [songIndex, setSongIndex] = useState(-1);
  const [mustFetch, setMustFetch] = useState(false);

  const userTemplate = {
    avatar: '',
    id: '',
    login: '',
    mail: '',
  };

  const [user, setUser] = useState(userTemplate);

  useEffect(() => {
    DefineUser().then(res => (res ? setUser(res.data) : null));
  }, []);

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <ShowPlayerContext.Provider value={{showPlayer, setShowPlayer}}>
          <SongIndexContext.Provider value={{songIndex, setSongIndex}}>
            <PlaylistContext.Provider
              value={{playlistPlayed, setPlaylistPlayed}}>
              <FetchContext.Provider value={{mustFetch, setMustFetch}}>
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
              </FetchContext.Provider>
            </PlaylistContext.Provider>
          </SongIndexContext.Provider>
        </ShowPlayerContext.Provider>
      </UserContext.Provider>
      <FlashMessage position="top" />
    </>
  );
};

export default AppContent;
