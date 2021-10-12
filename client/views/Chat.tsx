/* eslint-disable no-undef */
import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';

const Chat = (props: {ws: WebSocket}) => {
  const [message, setMessage] = useState('');

  return (
    <View>
      <TextInput
        onChangeText={input => setMessage(input)}
        value={message}
        placeholder="Enter a message..."
      />
      <TouchableOpacity
        onPress={() =>
          props.ws.send(
            new Blob([JSON.stringify({to: 'friend_name', content: message})], {
              type: 'application/json',
            }),
          )
        }>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
