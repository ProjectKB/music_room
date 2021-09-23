/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FlashMessage} from '../FlashMessage';
import {Button, Divider, Title} from 'react-native-paper';
import FetchContext from '../../contexts/FetchContext';
import {DelegatePlaylist} from '../../api/PlaylistEndpoint';
import {PlaylistType, Guest, Setter} from '../../types/Types';

type PlaylistGuestPickerModalProps = {
  guestCollection: Guest[];
  playlist: PlaylistType;

  setModalVisibility: Setter<boolean>;
};

const PlaylistGuestPickerModal = (props: PlaylistGuestPickerModalProps) => {
  const [guestPicked, setGuestPicked] = useState(props.guestCollection[0]);

  const {setMustFetch} = useContext(FetchContext);

  const flashMessageSuccess = `${guestPicked.login} is the new owner of ${props.playlist.name}!`;
  const flashMessageFailure = 'An error has occurred, please retry later!';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.modalContentContainer}>
        <View style={{padding: 20}}>
          <Title>Pick someone to delegate {props.playlist.name}</Title>
        </View>
        <Divider />
        <View style={styles.picker}>
          <Picker
            selectedValue={guestPicked}
            onValueChange={itemValue => setGuestPicked(itemValue)}
            prompt="Guests">
            {props.guestCollection.map(item => (
              <Picker.Item
                style={{fontSize: 20}}
                label={item.login}
                value={item as any}
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
            No
          </Button>
          <Button
            color="#899ed6"
            onPress={() => {
              const responseStatus = DelegatePlaylist(
                props.playlist.id,
                guestPicked.id,
              );

              responseStatus.then(status => {
                FlashMessage(status, flashMessageSuccess, flashMessageFailure);

                if (status) {
                  setMustFetch(true);
                }
              });

              props.setModalVisibility(false);
            }}>
            Delegate
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PlaylistGuestPickerModal;

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
