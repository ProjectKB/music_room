/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button, Divider, Title} from 'react-native-paper';
import {Setter} from '../../types/Types';

type ChatFriendsPickerModalProps = {
  friendsCollection: string[];
  conversationsCollection: {};
  navigation: any;

  setModalVisibility: Setter<boolean>;
};

const ChatFriendsPickerModal = (props: ChatFriendsPickerModalProps) => {
  const [friendPicked, setFriendPicked] = useState(props.friendsCollection[0]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.modalContentContainer}>
        <View style={{padding: 20}}>
          <Title>New Message to</Title>
        </View>
        <Divider />
        <View style={styles.picker}>
          <Picker
            selectedValue={friendPicked}
            onValueChange={itemValue => setFriendPicked(itemValue)}
            prompt="Guests">
            {props.friendsCollection.map(item => (
              <Picker.Item
                style={{fontSize: 20}}
                label={item}
                value={item as any}
                key={item}
                color="black"
              />
            ))}
          </Picker>
        </View>
        <View style={styles.actionContainer}>
          <Button
            color="#899ed6"
            onPress={() => props.setModalVisibility(false)}>
            Cancel
          </Button>
          <Button
            color="#899ed6"
            onPress={() => {
              props.navigation.navigate('Chat Detail', {
                conversationName: friendPicked,
              });

              props.setModalVisibility(false);
            }}>
            Confirm
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChatFriendsPickerModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
  modalContentContainer: {
    marginHorizontal: 25,
    backgroundColor: '#f3f1f4',
    borderRadius: 5,
    width: '100%',
  },
  picker: {
    backgroundColor: '#fcfafe',
    paddingHorizontal: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',
  },
});
