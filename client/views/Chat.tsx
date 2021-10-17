/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Text, View} from 'react-native';
import {FetchUserConversations} from '../api/UserEndpoint';
import UserContext from '../contexts/UserContext';
import {Message} from '../types/Types';

const Chat = (props: {newMessage: Message}) => {
  const [conversationsCollection, setConversationsCollection] = useState({});
  const [displayConversation, setDisplayConversation] = useState(false);
  const [friendsName, setFriendsName] = useState([]);

  const {user} = useContext(UserContext);

  const loadUserConversations = useCallback(() => {
    if (user) {
      FetchUserConversations(user.id).then(res =>
        setConversationsCollection(res ? res : {}),
      );
    }
  }, [user]);

  const conversationLoaded = useCallback(() => {
    const friendsTmp = Object.keys(conversationsCollection);

    if (friendsName !== friendsTmp) {
      if (friendsTmp.length) {
        for (const friend of friendsTmp) {
          if (conversationsCollection[friend].messages) {
            setDisplayConversation(true);
          }
        }
      } else {
        setDisplayConversation(false);
      }

      setFriendsName(friendsTmp);
    }
  }, [conversationsCollection]);

  const handleNewMessage = useCallback(() => {
    if (props.newMessage) {
      let conversationsCollectionTmp = conversationsCollection;
      const target =
        props.newMessage.from === user.login
          ? props.newMessage.to
          : props.newMessage.from;

      conversationsCollectionTmp[target] =
        conversationsCollection[target].messages.length !== 0
          ? [...conversationsCollection[target].messages, props.newMessage]
          : [props.newMessage];

      setConversationsCollection(conversationsCollectionTmp);
    }
  }, [props.newMessage]);

  useEffect(() => loadUserConversations(), [loadUserConversations]);
  useEffect(() => conversationLoaded(), [conversationLoaded]);
  useEffect(() => handleNewMessage(), [handleNewMessage]);

  // console.log(friendsName, displayConversation);

  return (
    <View>
      <Text>Coucou</Text>
    </View>
  );
};

export default Chat;
