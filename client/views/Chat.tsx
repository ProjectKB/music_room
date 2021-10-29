/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {FetchUserConversations} from '../api/UserEndpoint';
import ChatFriendsPickerModal from '../components/Chat/ChatFriendsPickerModal';
import CustomModal from '../components/CustomModal';
import SearchBar from '../components/SearchBar';
import UserContext, {userTemplate} from '../contexts/UserContext';
import {Message, Setter} from '../types/Types';
import {pick} from 'lodash';
import ChatList from '../components/Chat/ChatList';

type ChatProps = {
  newMessage: Message;
  modalVisibility: boolean;
  navigation: any;
  conversationsCollection: {};

  setModalVisibility: Setter<boolean>;
  setConversationsCollection: Setter<{}>;
};

const Chat = (props: ChatProps) => {
  const [friendsName, setFriendsName] = useState([]);
  const [friendsNameToShow, setFriendsNameToShow] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {user} = useContext(UserContext);

  const loadUserConversations = useCallback(() => {
    if (user !== userTemplate) {
      FetchUserConversations(user.id).then(res => {
        props.setConversationsCollection(res ? res : {});
      });
    }
  }, [user]);

  const defineFriendsName = useCallback(() => {
    const friendsTmp = Object.keys(props.conversationsCollection);

    // trigger when new friend is added
    if (friendsName !== friendsTmp) {
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
        [target]: conversationsCollectionTmp[target],
      });
    }
  }, [props.newMessage]);

  const filterConversationsToShow = useCallback(() => {
    let friendsNameToShowTmp = [];

    for (const friend of friendsName) {
      if (
        props.conversationsCollection[friend].messages &&
        friend.match(searchQuery)
      ) {
        friendsNameToShowTmp.push(friend);
      }
    }

    setFriendsNameToShow(friendsNameToShowTmp);
  }, [searchQuery, friendsName]);

  useEffect(() => loadUserConversations(), [loadUserConversations]);
  useEffect(() => defineFriendsName(), [defineFriendsName]);
  useEffect(() => handleNewMessage(), [handleNewMessage]);
  useEffect(() => filterConversationsToShow(), [filterConversationsToShow]);

  return (
    <View style={styles.mainContainer}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ChatList
        friendsName={friendsNameToShow}
        conversationsCollection={pick(
          props.conversationsCollection,
          friendsNameToShow,
        )}
        navigation={props.navigation}
      />
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

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1a1a1a',
    flex: 1,
  },
});
