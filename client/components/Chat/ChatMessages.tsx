import React from 'react';
import {Text} from 'react-native';
import {Message} from '../../types/Types';

const ChatMessages = (props: {conversation: any}) => (
  <>
    {props.conversation.messages
      ? props.conversation.messages.map((msg: Message) => {
          return <Text key={msg.date}>{msg.content}</Text>;
        })
      : null}
  </>
);

export default ChatMessages;
