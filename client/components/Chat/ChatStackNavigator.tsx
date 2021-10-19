import React, {useState} from 'react';
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
  const [modalVisibility, setModalVisibility] = useState(false);
  const [conversationsCollection, setConversationsCollection] = useState({});

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        children={chatProps => (
          <Chat
            newMessage={props.newMessage}
            modalVisibility={modalVisibility}
            setModalVisibility={setModalVisibility}
            navigation={chatProps.navigation}
            conversationsCollection={conversationsCollection}
            setConversationsCollection={setConversationsCollection}
          />
        )}
        options={{
          title: 'Chat',
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTitle: headerTitleProps => (
            <PlaylistStackHeader
              navigation={headerTitleProps}
              displayAddButton={true}
              addAction={() => setModalVisibility(true)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Chat Detail"
        children={chatDetailProps => (
          <ChatDetail
            ws={props.ws}
            newMessage={props.newMessage}
            navigation={chatDetailProps.navigation}
            conversationName={chatDetailProps.route.params.conversationName}
            conversations={conversationsCollection}
          />
        )}
        options={{
          title: 'Chat Detail',
          headerStyle: {backgroundColor: '#1a1a1a'},
          headerTintColor: 'white',
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
