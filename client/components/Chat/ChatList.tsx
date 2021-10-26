/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import ChatElement from './ChatElement';

type ChatListProps = {
  friendsName: string[];
  conversationsCollection: {};
  navigation: any;
};

const ChatList = (props: ChatListProps) => (
  <ScrollView style={{margin: 15}}>
    {props.friendsName.map((friendName: string, index: number) => (
      <ChatElement
        key={friendName}
        lastElem={index === props.friendsName.length - 1}
        friendName={friendName}
        conversation={props.conversationsCollection[friendName]}
        navigation={props.navigation}
      />
    ))}
  </ScrollView>
);

export default ChatList;
