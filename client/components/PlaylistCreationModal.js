import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Portal, Provider, Dialog, Button} from 'react-native-paper';
import {CreatePlaylist} from '../api/PlaylistEndpoint';
import {FlashMessage} from './FlashMessage';

const PlaylistCreationModal = props => {
  const [playlistName, setPlaylistName] = useState('');
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  const inputErrorText = inputIsEmpty
    ? '* you have to choose a name for your playlist'
    : '';

  const flashMessageSuccess = `${playlistName} has been successfully added!`;
  const flashMessageFailure = 'An error has occurred, please retry later!';

  return (
    <Provider>
      <Portal>
        <Dialog
          visible={props.creationPlaylistModal}
          onDismiss={() => props.setCreationPlaylistModal(false)}
          style={styles.dialogContainer}>
          <Dialog.Content style={styles.textInputContainer}>
            <TextInput
              style={{fontSize: 25}}
              selectionColor="#8c8c8c"
              mode="flat"
              placeholder="Pick a Name"
              onChangeText={text => {
                setPlaylistName(text);
                if (text === '') {
                  setInputIsEmpty(true);
                } else if (inputIsEmpty && text !== '') {
                  setInputIsEmpty(false);
                }
              }}
            />
            <Text style={styles.textError}>{inputErrorText}</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActionContainer}>
            <Button
              color="#899ed6"
              onPress={() => {
                props.setCreationPlaylistModal(false);
                if (inputIsEmpty) {
                  setInputIsEmpty(false);
                }
              }}>
              Cancel
            </Button>
            <Button
              color="#899ed6"
              onPress={() => {
                if (playlistName === '') {
                  if (!inputIsEmpty) {
                    setInputIsEmpty(true);
                  }
                } else {
                  const responseStatus = CreatePlaylist(
                    props.setPlaylistCollection,
                    playlistName,
                  );
                  responseStatus.then(status =>
                    FlashMessage(
                      status,
                      flashMessageSuccess,
                      flashMessageFailure,
                    ),
                  );
                  props.setCreationPlaylistModal(false);
                  setPlaylistName('');
                }
              }}>
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default PlaylistCreationModal;

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  textInputContainer: {
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  dialogActionContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  textError: {
    color: '#b00012',
    fontSize: 12,
    paddingLeft: 5,
  },
});
