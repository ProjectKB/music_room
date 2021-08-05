/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FlashMessage} from '../FlashMessage';
import {Button, Divider, Title} from 'react-native-paper';

const PlaylistUserFriendPickerModal = props => {
  const [friendPicked, setFriendPicked] = useState(props.friendCollection[0]);

  const flashMessageSuccess = `${friendPicked.login} is is a new guest of ${props.playlist.name}!`;
  const flashMessageError = `${friendPicked.login} is already a guest... Pick another one!`;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.modalContentContainer}>
        <View style={{padding: 20}}>
          <Title>Who's the lucky one?</Title>
        </View>
        <Divider />
        <View style={styles.picker}>
          <Picker
            selectedValue={friendPicked}
            onValueChange={itemValue => setFriendPicked(itemValue)}
            prompt="Guests">
            {props.friendCollection.map(item => (
              <Picker.Item
                style={{fontSize: 20}}
                label={item.login}
                value={item}
                key={item.id}
                color="black"
              />
            ))}
          </Picker>
        </View>
        <View style={styles.actionContainer}>
          <Button
            color="#899ed6"
            onPress={() => props.setModalVisibility(false)}>
            Nobody
          </Button>
          <Button
            color="#899ed6"
            onPress={() => {
              const check = props.newGuestCollection.find(
                elem => elem.id === friendPicked.id,
              );

              if (!check) {
                let newGuestCollection = [...props.newGuestCollection];
                let newGuest = {...friendPicked};

                const isContributor = props.guestContext === 'contributor';

                let newGuestPayload = [...props.guestPayload];
                let guestPayload = {
                  id: friendPicked.id,
                  contributor: isContributor,
                };

                newGuest.contributor = isContributor;
                newGuestCollection.push(newGuest);
                newGuestPayload.push(guestPayload);

                props.setNewGuestCollection(newGuestCollection);
                props.setGuestPayload(newGuestPayload);
              }

              FlashMessage(!check, flashMessageSuccess, flashMessageError);

              props.setModalVisibility(false);
            }}>
            Guestify
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PlaylistUserFriendPickerModal;

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
