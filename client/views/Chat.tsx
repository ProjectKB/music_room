/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {Text, View} from 'react-native';
import {FetchUserConversations} from '../api/UserEndpoint';
import ChatFriendsPickerModal from '../components/Chat/ChatFriendsPickerModal';
import CustomModal from '../components/CustomModal';
import UserContext from '../contexts/UserContext';
import {Message, Setter} from '../types/Types';

type ChatProps = {
  newMessage: Message;
  modalVisibility: boolean;
  navigation: any;
  conversationsCollection: {};

  setModalVisibility: Setter<boolean>;
  setConversationsCollection: Setter<{}>;
};

const Chat = (props: ChatProps) => {
  const [displayConversation, setDisplayConversation] = useState(false);
  const [friendsName, setFriendsName] = useState([]);

  const {user} = useContext(UserContext);

  const loadUserConversations = useCallback(() => {
    if (user) {
      FetchUserConversations(user.id).then(res =>
        props.setConversationsCollection(res ? res : {}),
      );
    }
  }, [user]);

  const conversationLoaded = useCallback(() => {
    const friendsTmp = Object.keys(props.conversationsCollection);

    if (friendsName !== friendsTmp) {
      if (friendsTmp.length) {
        for (const friend of friendsTmp) {
          if (props.conversationsCollection[friend].messages) {
            setDisplayConversation(true);
          }
        }
      } else {
        setDisplayConversation(false);
      }

      setFriendsName(friendsTmp);
    }
  }, [props.conversationsCollection]);

  const handleNewMessage = useCallback(() => {
    if (props.newMessage) {
      let conversationsCollectionTmp = props.conversationsCollection;
      const target =
        props.newMessage.from === user.login
          ? props.newMessage.to
          : props.newMessage.from;

      conversationsCollectionTmp[target].messages = props
        .conversationsCollection[target].messages
        ? [...props.conversationsCollection[target].messages, props.newMessage]
        : [props.newMessage];

      props.setConversationsCollection({
        ...props.conversationsCollection,
        target: conversationsCollectionTmp[target],
      });
    }
  }, [props.newMessage]);

  useEffect(() => loadUserConversations(), [loadUserConversations]);
  useEffect(() => conversationLoaded(), [conversationLoaded]);
  useEffect(() => handleNewMessage(), [handleNewMessage]);

  return (
    <View>
      <Text>Coucou</Text>
      <CustomModal
        modalVisibility={props.modalVisibility}
        setModalVisibility={props.setModalVisibility}
        secu={true}
        Component={() => (
          <ChatFriendsPickerModal
            friendsCollection={friendsName}
            setModalVisibility={props.setModalVisibility}
            conversationsCollection={props.conversationsCollection}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
};

export default Chat;
