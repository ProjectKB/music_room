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

const AppContent = (props: {ws: WebSocket}) => {
  const Tab = createMaterialTopTabNavigator();

  props.ws.onmessage = function (info: any) {
    let data = JSON.parse(info.data);

    console.log('Msg received');
    console.log(data);
  };

  props.ws.onclose = () => {
    // send notif to other
    console.log('User Disconnected');
  };

  return (
    <>
      <ContextProvider>
        <Tab.Navigator
          tabBar={tabBarProps => <TabBar {...tabBarProps} />}
          tabBarPosition="bottom">
          <Tab.Screen name={'Home'} component={Home} />
          <Tab.Screen name={'Playlist'} component={PlaylistStackNavigator} />
          <Tab.Screen name={'Search'} component={SearchStackNavigator} />
          <Tab.Screen name={'Event'} component={Event} />
          <Tab.Screen name={'Chat'} children={() => <Chat ws={props.ws} />} />
        </Tab.Navigator>
      </ContextProvider>
      <FlashMessage position="top" />
    </>
  );
};

export default AppContent;
