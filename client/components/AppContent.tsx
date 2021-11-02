import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../views/Home';
import Event from '../views/Event';
import TabBar from './TabBar';
import PlaylistStackNavigator from './Playlist/PlaylistStackNavigator';
import FlashMessage from 'react-native-flash-message';
import SearchStackNavigator from './Search/SearchStackNavigator';
import ContextProvider from './ContextProvider';
import ChatStackNavigator from './Chat/ChatStackNavigator';
import {HandleSockets} from '../helpers/Socket';

const AppContent = (props: {ws: WebSocket}) => {
  const Tab = createMaterialTopTabNavigator();

  const [newMessage, setNewMessage] = useState(undefined);
  const [newFriend, setNewFriend] = useState(undefined);

  props.ws.onmessage = function (info: any) {
    let data = JSON.parse(info.data);

    HandleSockets[data.type]({data, setNewMessage, setNewFriend});
  };

  return (
    <>
      <ContextProvider>
        <Tab.Navigator
          tabBar={tabBarProps => <TabBar {...tabBarProps} />}
          tabBarPosition="bottom">
          <Tab.Screen
            name={'Home'}
            children={() => <Home newFriend={newFriend} />}
          />
          <Tab.Screen name={'Playlist'} component={PlaylistStackNavigator} />
          <Tab.Screen name={'Search'} component={SearchStackNavigator} />
          <Tab.Screen name={'Event'} component={Event} />
          <Tab.Screen
            name={'Chat'}
            children={() => (
              <ChatStackNavigator ws={props.ws} newMessage={newMessage} />
            )}
          />
        </Tab.Navigator>
      </ContextProvider>
      <FlashMessage position="top" />
    </>
  );
};

export default AppContent;
