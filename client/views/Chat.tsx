/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Text, View} from 'react-native';
import {FetchUserConversations, FetchUserFriends} from '../api/UserEndpoint';
import UserContext from '../contexts/UserContext';
import {User, Conversation, Message} from '../types/Types';

type ChatFood = {
  friend: User;
  conversation: Conversation;
  started: boolean;
};

const Chat = (props: {newMessage: Message}) => {
  const [conversationsCollection, setConversationsCollection] = useState([]);
  const [friendsCollection, setFriendsCollection] = useState([]);
  const [displayConversation, setDisplayConversation] = useState(false);
  const [messages, setMessages] = useState({});

  const {user} = useContext(UserContext);

  const loadFriendsAndConversations = useCallback(() => {
    FetchUserConversations(user.id).then(res =>
      setConversationsCollection(res ? res : []),
    );

    FetchUserFriends(user.id).then(res => setFriendsCollection(res ? res : []));
  }, [user]);

  const conversationLoaded = useCallback(() => {
    for (const conversation of conversationsCollection) {
      if (conversation.messages && conversation.messages.length !== 0) {
        setDisplayConversation(true);
      }
    }
  }, [conversationsCollection]);

  const handleNewMessage = useCallback(() => {
    if (props.newMessage) {
      let messagesCopy = messages;
      const target =
        props.newMessage.from === user.login
          ? props.newMessage.to
          : props.newMessage.from;

      messagesCopy[target] = messages[target]
        ? [...messages[target], props.newMessage.content]
        : [props.newMessage.content];

      setMessages(messagesCopy);
    }
  }, [props.newMessage]);

  useEffect(() => loadFriendsAndConversations(), [loadFriendsAndConversations]);
  useEffect(() => conversationLoaded(), [conversationLoaded]);
  useEffect(() => handleNewMessage(), [handleNewMessage]);

  return (
    <View>
      <Text>Coucou</Text>
    </View>
  );
};

export default Chat;
