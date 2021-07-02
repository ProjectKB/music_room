import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import CreateAccountScreen from './views/CreateAccountScreen';
import Playlist from './views/Playlist';
import SongDetails from './views/SongDetails';
import Event from './views/Event';
import Search from './views/Search';
import Chat from './views/Chat';
import TabBar from './components/TabBar';
import PlaylistStackHeader from './components/PlaylistStackHeader';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Amodif = createStackNavigator();

const App = () => {
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
          component={SongDetails}
          options={{
            title: 'Playlist Song',
            headerTitle: props => <PlaylistStackHeader navigation={props} />,
          }}
        />
      </Stack.Navigator>
    );
  };

  const AuthentificationNavigation = () => {
    return (
      <Amodif.Navigator>
        <Amodif.Screen name="LoginScreen" component={LoginScreen} />
        <Amodif.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
        <Amodif.Screen name="HomeScreen" component={HomeScreen} />
      </Amodif.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        tabBarPosition="bottom">
        <Tab.Screen
          name={'HomeScreen'}
          component={AuthentificationNavigation}
        />
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
