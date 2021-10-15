/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native-paper';

const ChatList = props =>
  props.conversationsCollection.length === 0 ? (
    <Text style={{color: 'white'}}>You have no conversations yet.</Text>
  ) : (
    <>
      {props.conversationsCollection.map(elem => (
        <ChatElement />
      ))}
    </>
  );

export default ChatList;
