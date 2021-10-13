/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const Chat = (props: {ws: WebSocket}) => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.conversationContainer}>
        <Text>Content</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={input => setMessage(input)}
          style={styles.input}
          selectionColor="#8c8c8c"
          placeholderTextColor="#a1a1a1"
          placeholder="Enter a message..."
          value={message}
          keyboardType="default"
        />
        <TouchableOpacity
          onPress={() => {
            props.ws.send(
              new Blob(
                [JSON.stringify({to: 'friend_name', content: message})],
                {
                  type: 'application/json',
                },
              ),
            );

            setMessage('');
          }}>
          {message !== '' && (
            <FontAwesomeIcon
              icon={faChevronRight}
              size={30}
              color="#606570"
              style={{marginLeft: 5, marginRight: -10}}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#38393E',
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#606570',
    padding: 10,
    flex: 1,
    borderRadius: 10,
    color: 'white',
  },
  conversationContainer: {
    flex: 1,
    backgroundColor: '#38393E',
    marginBottom: 10,
  },
});
