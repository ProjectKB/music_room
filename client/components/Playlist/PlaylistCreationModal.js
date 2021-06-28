/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-paper';
import {CreatePlaylist} from '../../api/PlaylistEndpoint';
import {FlashMessage} from '../FlashMessage';

const PlaylistCreationModal = props => {
  const [playlistName, setPlaylistName] = useState('');
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  const inputErrorText = inputIsEmpty
    ? '* you have to choose a name for your playlist'
    : '';

  const flashMessageSuccess = `${playlistName} has been successfully added!`;
  const flashMessageFailure = 'An error has occurred, please retry later!';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textInputContainer}>
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
      </View>
      <View style={styles.dialogActionContainer}>
        <Button
          color="#899ed6"
          onPress={() => {
            props.setModalVisibility(false);
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
                FlashMessage(status, flashMessageSuccess, flashMessageFailure),
              );
              props.setModalVisibility(false);
              setPlaylistName('');
            }
          }}>
          Create
        </Button>
      </View>
    </View>
  );
};

export default PlaylistCreationModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
  textInputContainer: {
    backgroundColor: '#f3f1f4',
    padding: 10,
    paddingBottom: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
  },
  textError: {
    color: '#b00012',
    fontSize: 12,
    paddingLeft: 5,
    marginTop: -5,
    marginBottom: 15,
  },
  dialogActionContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: '#e8e6e9',
    width: '100%',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
});
