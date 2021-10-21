/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Message} from '../../types/Types';
import ChatMessageElement from './ChatMessageElement';

type ChatMessagesProps = {
  conversation: any;
  conversationName: string;
};

const ChatMessages = (props: ChatMessagesProps) => (
  <View style={{flex: 1, justifyContent: 'flex-end'}}>
    {props.conversation.messages
      ? props.conversation.messages.map((msg: Message, index: number) => (
          <ChatMessageElement
            key={msg.date}
            msg={msg}
            index={index}
            messagesNbr={props.conversation?.messages?.length - 1 ?? 0}
            conversation={props.conversation}
            conversationName={props.conversationName}
          />
        ))
      : null}
  </View>
);

export default ChatMessages;
