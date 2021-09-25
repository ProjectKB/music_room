import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../views/Home';
import Event from '../views/Event';
import Chat from '../views/Chat';
import TabBar from './TabBar';
import PlaylistStackNavigator from './Playlist/PlaylistStackNavigator';
import FlashMessage from 'react-native-flash-message';
import SearchStackNavigator from './Search/SearchStackNavigator';
import ContextProvider from './ContextProvider';

const AppContent = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <ContextProvider>
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          tabBarPosition="bottom">
          <Tab.Screen name={'Home'} component={Home} />
          <Tab.Screen name={'Playlist'} component={PlaylistStackNavigator} />
          <Tab.Screen name={'Search'} component={SearchStackNavigator} />
          <Tab.Screen name={'Event'} component={Event} />
          <Tab.Screen name={'Chat'} component={Chat} />
        </Tab.Navigator>
      </ContextProvider>
      <FlashMessage position="top" />
    </>
  );
};

export default AppContent;
