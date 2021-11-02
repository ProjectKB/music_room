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
import {FlashMessage as FlashMsg} from './FlashMessage';

const AppContent = (props: {ws: WebSocket}) => {
  const Tab = createMaterialTopTabNavigator();

  const [newMessage, setNewMessage] = useState(undefined);
  const [newFriend, setNewFriend] = useState(undefined);

  props.ws.onmessage = function (info: any) {
    let data = JSON.parse(info.data);

    handleMessage(data);
  };

  const handleMessage = (data: any) => {
    switch (data.type) {
      case 'join':
        console.log(data.content);
        break;
      case 'leave':
        console.log(data.content + ' has leaved the chat at', data.date);
        break;
      case 'message':
        console.log('New Message:', data.content.content);
        setNewMessage(data.content);
        break;
      case 'friendship request':
        console.log(data.content);
        break;
      case 'friendship confirmed':
        console.log(data.content);
        break;
      case 'update user friends':
        setNewFriend(data.content);
        break;
      case 'error':
        FlashMsg(false, '', data.content);
        break;
    }
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
