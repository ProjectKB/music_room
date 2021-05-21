import React, {useState} from 'react';
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

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  
  // global.URL = 'http://192.168.1.65:8080';

  global.URL = 'http://10.18.168.38:8080';
  const [showPlayer, setShowPlayer] = useState(false);

  const playlistStackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Playlist"
          component={Playlist}
          options={{
            title: 'Playlist',
            headerTitle: props => <PlaylistStackHeader navigation={props} />,
          }}
        />
        <Stack.Screen
          name="SongDetails"
          component={SongsList}
          options={{
            title: 'Playlist Song',
            headerTitle: props => <PlaylistStackHeader navigation={props} />,
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => {
          if (showPlayer) {
            return <TabBar {...props} />;
          }
        }}
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

const styles = StyleSheet.create({
  playlistStackHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playlistStackHeaderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  playlistStackHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 6,
  },
});
