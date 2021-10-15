import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlaylistStackHeader from '../Playlist/PlaylistStackHeader';
import ChatDetail from '../../views/ChatDetail';
import {Message} from '../../types/Types';
import Chat from '../../views/Chat';

const Stack = createStackNavigator();

type ChatStackNavigatorProps = {
  ws: WebSocket;
  newMessage: Message;
};

const ChatStackNavigator = (props: ChatStackNavigatorProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        children={() => <Chat newMessage={props.newMessage} />}
        options={{
          title: 'Chat',
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTitle: headerTitleProps => (
            <PlaylistStackHeader
              navigation={headerTitleProps}
              displayAddButton={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Chat Detail"
        children={() => (
          <ChatDetail ws={props.ws} newMessage={props.newMessage} />
        )}
        options={{
          title: 'Chat Detail',
          headerStyle: {backgroundColor: '#38393E'},
          headerTitle: headerTitleProps => (
            <PlaylistStackHeader
              navigation={headerTitleProps}
              displayAddButton={false}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
