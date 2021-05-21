import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './views/Home';
import Playlist from './views/Playlist';
import SongDetails from './views/SongDetails';
import Event from './views/Event';
import Search from './views/Search';
import Chat from './views/Chat';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faMusic,
  faSearch,
  faCalendar,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import PlaylistStackHeader from './components/PlaylistStackHeader';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const playlistStackNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Playlist"
          component={Playlist}
          options={{
            headerTitle: () => <PlaylistStackHeader title="Playlist" />,
          }}
        />
        <Stack.Screen name="SongDetails" component={SongDetails} />
      </Stack.Navigator>
    );
  };

  const tabScreen = (name, component, icon, size) => {
    return (
      <Tab.Screen
        name={name}
        component={component}
        options={{
          tabBarLabel: name,
          tabBarIcon: ({color}) => {
            return <FontAwesomeIcon size={size} icon={icon} color={color} />;
          },
        }}
      />
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarPosition="bottom"
        tabBarOptions={{
          labelStyle: {fontSize: 12},
          showIcon: true,
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}>
        {tabScreen('Home', Home, faHome, 27)}
        {tabScreen('Playlist', playlistStackNavigation, faMusic, 22)}
        {tabScreen('Search', Search, faSearch, 25)}
        {tabScreen('Event', Event, faCalendar, 23)}
        {tabScreen('Chat', Chat, faCommentDots, 25)}
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
