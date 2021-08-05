import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {RadioButton} from 'react-native-paper';
import UserContext from '../../contexts/UserContext';
import FetchContext from '../../contexts/FetchContext';
import {FlashMessage} from '../FlashMessage';
import {UpdatePlaylist} from '../../api/PlaylistEndpoint';

const PlaylistEditionContent = props => {
  const [playlistStatus, setPlaylistStatus] = useState('public');
  const [name, setName] = useState(props.playlist.name);
  const [nameError, setNameError] = useState(false);

  const [initialGuests, setInitialGuests] = useState(
    props.playlist.guests !== undefined
      ? [...props.playlist.guests]
      : undefined,
  );

  const {user} = useContext(UserContext);
  const {setMustFetch} = useContext(FetchContext);

  const onChangeText = (input, setInput, inputError, setInputError) => {
    setInput(input);

    input.length === 0 && !inputError
      ? setInputError(true)
      : setInputError(false);
  };

  const VisibilityPicker = () =>
    user.id === props.playlist.owner_id ? (
      <RadioButton.Group
        onValueChange={value => {
          setPlaylistStatus(value);
        }}
        value={playlistStatus}>
        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButton}>
            <RadioButton
              color="#899ed6"
              uncheckedColor="white"
              value="public"
              status={playlistStatus === 'public' ? 'checked' : 'unchecked'}
            />
            <Text style={{color: 'white'}}>Public</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              color="#899ed6"
              uncheckedColor="white"
              value="private"
              status={playlistStatus === 'private' ? 'checked' : 'unchecked'}
            />
            <Text style={{color: 'white'}}>Private</Text>
          </View>
        </View>
      </RadioButton.Group>
    ) : null;

  const Chip = chipProps => {
    let chipColor = {backgroundColor: '#899ed6'};

    if (props.playlist.status === 'private') {
      if (chipProps.newChips === undefined) {
        const guest = props.playlist.guests.find(
          elem => elem.id === chipProps.elem.id,
        );

        if (guest !== undefined) {
          chipColor = {
            backgroundColor:
              guest.contributor !== undefined ? '#899ed6' : '#b89ad6',
          };
        }
      } else {
        chipColor = {
          backgroundColor: chipProps.elem.contributor ? '#899ed6' : '#b89ad6',
        };
      }
    }

    return (
      <TouchableOpacity style={[styles.chipContainer, chipColor]}>
        <Text>{chipProps.elem.login}</Text>
        <TouchableOpacity
          onPress={() => {
            let guestCollectionCopy = [...chipProps.collection];

            guestCollectionCopy.splice(chipProps.index, 1);
            chipProps.setter(guestCollectionCopy);

            if (chipProps.newChips !== undefined) {
              let guestPayloadCopy = [...props.guestPayload];

              guestPayloadCopy.splice(chipProps.index, 1);
              props.setGuestPayload(guestPayloadCopy);
            } else {
              let guestPayloadCopy = [...initialGuests];

              guestPayloadCopy.splice(chipProps.index, 1);
              setInitialGuests(guestPayloadCopy);
            }

            FlashMessage(
              true,
              `${chipProps.elem.login} has been removed from ${props.playlist.name}'s guest`,
              '',
            );
          }}>
          <FontAwesomeIcon style={{marginLeft: 5}} size={12} icon={faTimes} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const ActualChips = actualChipsProps => {
    if (props.playlist.guests !== undefined) {
      return props.guestCollection.map((elem, index) =>
        elem.id !== user.id ? (
          <Chip
            elem={elem}
            key={elem.id}
            index={index}
            collection={props.guestCollection}
            setter={actualChipsProps.setter}
          />
        ) : null,
      );
    } else {
      return null;
    }
  };

  const NewChips = newChipsProps => {
    if (props.newGuestCollection.length !== 0) {
      return props.newGuestCollection.map((elem, index) =>
        elem.id !== user.id ? (
          <Chip
            elem={elem}
            key={elem.id}
            index={index}
            collection={props.newGuestCollection}
            setter={newChipsProps.setter}
            newChips={true}
          />
        ) : null,
      );
    } else {
      return null;
    }
  };

  const GuestChips = () => (
    <View style={styles.guestContainer}>
      <ScrollView horizontal={true}>
        <ActualChips setter={props.setGuestCollection} />
        <NewChips setter={props.setNewGuestCollection} />
      </ScrollView>
    </View>
  );

  const AddGuestButton = () => (
    <View style={styles.addGuestContainer}>
      {props.playlist.status === 'private' ? (
        <>
          <TouchableOpacity
            onPress={() => {
              props.setGuestContext('contributor');
              props.setModalVisibility(true);
            }}
            style={[styles.addGuest, {backgroundColor: '#899ed6'}]}>
            <Text>ADD CONTRIBUTOR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setGuestContext('guest');
              props.setModalVisibility(true);
            }}
            style={[styles.addGuest, {backgroundColor: '#b89ad6'}]}>
            <Text>ADD GUEST</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            props.setGuestContext('contributor');
            props.setModalVisibility(true);
          }}
          style={[styles.addGuest, {width: '95%', backgroundColor: '#899ed6'}]}>
          <Text>ADD CONTRIBUTOR</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <VisibilityPicker />
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
      <AddGuestButton />
      <GuestChips />
      <View style={styles.editContainer}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => {
            let payload = {};

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

            UpdatePlaylist(props.playlist.id, payload).then(res =>
              res ? setMustFetch(true) : console.log(res),
            );

            props.navigation.navigate('Playlist');
          }}>
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
  guestContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 25,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginRight: 5,
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 50,
    paddingLeft: 35,
  },
  radioButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
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
  addGuestContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  addGuest: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    color: 'black',
    height: 40,
    borderRadius: 50,
    fontSize: 24,
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
