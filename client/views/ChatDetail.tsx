/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Message} from '../types/Types';
import ChatMessages from '../components/Chat/ChatMessages';
import {SocketFriendshipConfirmed, SocketMessage} from '../helpers/Socket';

type ChatDetailProps = {
  ws: WebSocket;
  newMessage: Message;
  navigation: any;
  conversationName: string;
  conversations: {};
};

const ChatDetail = (props: ChatDetailProps) => {
  const [message, setMessage] = useState('');

  const scrollViewRef = useRef();

  useEffect(() => props.navigation.setOptions({title: props.conversationName}));

  const handlePress = async () => {
    props.ws.send(
      SocketMessage(props.conversationName, message, props.conversations),
    );
  };

  // useEffect(() => {
  //   props.ws.send(
  //     SocketFriendshipConfirmed(
  //       '60fe76501c32f3940b389358',
  //       '60fe7ad83ff810f2ad042eb6',
  //       'a',
  //       '6179323748463d76bed1af07',
  //     ),
  //   );
  // });

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={styles.conversationContainer}
        contentContainerStyle={{flexGrow: 1}}>
        <ChatMessages
          conversation={props.conversations[props.conversationName]}
          conversationName={props.conversationName}
        />
      </ScrollView>
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
            handlePress();
            setMessage('');
          }}>
          {message !== '' && (
            <FontAwesomeIcon
              icon={faChevronRight}
              size={30}
              color="#606570"
              style={styles.submitMessage}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1a1a1a',
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
    marginBottom: 10,
    flex: 1,
  },
  submitMessage: {
    marginLeft: 5,
    marginRight: -10,
  },
});
