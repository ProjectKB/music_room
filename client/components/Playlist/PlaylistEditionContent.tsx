/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import UserContext from '../../contexts/UserContext';
import FetchContext from '../../contexts/FetchContext';
import {FlashMessage} from '../FlashMessage';
import {UpdatePlaylist} from '../../api/PlaylistEndpoint';
import {
  Guest,
  GuestStatus,
  PlaylistPayload,
  PlaylistType,
  Setter,
} from '../../types/Types';
import PlaylistEditionVisibilityPicker from './PlaylistEditionVisibilityPicker';
import PlaylistEditionChips from './PlaylistEditionChips';
import PlaylistAddGuestButton from './PlaylistAddGuestButton';

type PlaylistEditionContentProps = {
  playlist: PlaylistType;
  guestPayload: Guest[];
  guestCollection: Guest[];
  newGuestCollection: Guest[];
  modalVisibility: boolean;
  navigation: any;

  setGuestCollection: Setter<Guest[]>;
  setNewGuestCollection: Setter<Guest[]>;
  setGuestPayload: Setter<Guest[]>;
  setGuestContext: Setter<GuestStatus>;
  setModalVisibility: Setter<boolean>;
};

const PlaylistEditionContent = (props: PlaylistEditionContentProps) => {
  const [playlistStatus, setPlaylistStatus] = useState(props.playlist.status);
  const [name, setName] = useState(props.playlist.name);
  const [nameError, setNameError] = useState(false);

  const {user} = useContext(UserContext);

  let initialGuestsTmp: Guest[];

  if (props.playlist.guests !== undefined) {
    initialGuestsTmp = [...props.playlist.guests];

    if (props.playlist.owner_id !== user.id) {
      initialGuestsTmp.splice(
        props.playlist.guests.findIndex(elem => elem.id === user.id),
        1,
      );
    }
  }

  const [initialGuests, setInitialGuests] = useState(initialGuestsTmp);

  const {setMustFetch} = useContext(FetchContext);

  const flashMessageSuccess = `${props.playlist.name} has been successfully updated!`;
  const flashMessageFailure = 'An error has occurred, please retry later!';

  const onChangeText = (
    input: string,
    setInput: Setter<string>,
    inputError: boolean,
    setInputError: Setter<boolean>,
  ) => {
    setInput(input);

    input.length === 0 && !inputError
      ? setInputError(true)
      : setInputError(false);
  };

  const onPress = () => {
    let payload: PlaylistPayload = {};

    if (props.playlist.name !== name) {
      payload.name = name;
    }

    if (props.playlist.status !== playlistStatus) {
      payload.status = playlistStatus;
    }

    if (props.guestPayload.length !== 0) {
      if (props.playlist.guests !== undefined) {
        payload.guests = [...initialGuests, ...props.guestPayload];
      } else {
        payload.guests = [...props.guestPayload];
      }
    } else if (props.playlist.guests !== undefined) {
      payload.guests = [...initialGuests];
    }

    if (props.playlist.owner_id !== user.id) {
      payload.guests.push({id: user.id, contributor: true});
    }

    UpdatePlaylist(props.playlist.id, payload).then(res => {
      FlashMessage(res, flashMessageSuccess, flashMessageFailure);

      if (res) {
        setMustFetch(true);
      }
    });

    props.navigation.navigate('Playlist');
  };

  return (
    <View style={styles.mainContainer}>
      <PlaylistEditionVisibilityPicker
        user={user}
        playlist={props.playlist}
        playlistStatus={playlistStatus}
        setPlaylistStatus={setPlaylistStatus}
      />
      <View style={styles.inputText}>
        <TextInput
          style={styles.input}
          onChangeText={input =>
            onChangeText(input, setName, nameError, setNameError)
          }
          value={name}
          placeholder="name"
        />
        {nameError ? (
          <Text style={styles.inputError}>* name can't be empty"</Text>
        ) : null}
      </View>
      <PlaylistAddGuestButton
        user={user}
        playlistStatus={playlistStatus}
        setPlaylistStatus={setPlaylistStatus}
        setGuestContext={props.setGuestContext}
        setModalVisibility={props.setModalVisibility}
      />
      <PlaylistEditionChips
        playlist={props.playlist}
        playlistStatus={playlistStatus}
        setPlaylistStatus={setPlaylistStatus}
        guestPayload={props.guestPayload}
        setGuestPayload={props.setGuestPayload}
        initialGuests={initialGuests}
        setInitialGuests={setInitialGuests}
        guestCollection={props.guestCollection}
        setGuestCollection={props.setGuestCollection}
        newGuestCollection={props.newGuestCollection}
        setNewGuestCollection={props.setNewGuestCollection}
      />
      <View style={styles.editContainer}>
        <TouchableOpacity style={styles.edit} onPress={() => onPress()}>
          <Text style={{fontSize: 18}}>EDIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaylistEditionContent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 50,
  },
  inputText: {
    marginTop: 10,
    width: '100%',
    marginBottom: 15,
  },
  input: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    color: 'black',
    height: 50,
    borderRadius: 50,
    fontSize: 24,
  },
  inputError: {
    color: '#b00012',
    paddingHorizontal: 20,
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
  },
  edit: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#628cbe',
    color: 'black',
    height: 45,
    borderRadius: 50,
    fontSize: 24,
  },
});
