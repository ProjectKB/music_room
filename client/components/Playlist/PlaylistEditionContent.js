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
import {FlashMessage} from '../FlashMessage';

const PlaylistEditionContent = props => {
  const [playlistStatus, setPlaylistStatus] = useState('public');
  const [name, setName] = useState(props.playlist.name);
  const [nameError, setNameError] = useState(false);

  const {user} = useContext(UserContext);

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
      const guest = props.playlist.guests.find(
        elem => elem.id === chipProps.elem.id,
      );

      if (guest !== undefined) {
        chipColor = {
          backgroundColor:
            guest.contributor !== undefined ? '#899ed6' : '#b89ad6',
        };
      }
    }

    return (
      <TouchableOpacity style={[styles.chipContainer, chipColor]}>
        <Text>{chipProps.elem.login}</Text>
        <TouchableOpacity
          onPress={() => {
            let guestCollectionCopy = [...props.guestCollection];

            guestCollectionCopy.splice(chipProps.index, 1);
            props.setGuestCollection(guestCollectionCopy);
          }}>
          <FontAwesomeIcon style={{marginLeft: 5}} size={12} icon={faTimes} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const GuestChips = () =>
    props.playlist.guests !== undefined ? (
      <View style={styles.guestContainer}>
        <ScrollView horizontal={true}>
          {props.guestCollection.map((elem, index) =>
            elem.id !== user.id ? (
              <Chip elem={elem} key={elem.id} index={index} />
            ) : null,
          )}
        </ScrollView>
      </View>
    ) : null;

  const AddGuestButton = () => (
    <View style={styles.addGuestContainer}>
      {props.playlist.status === 'private' ? (
        <>
          <TouchableOpacity
            style={[styles.addGuest, {backgroundColor: '#899ed6'}]}>
            <Text>ADD CONTRIBUTOR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addGuest, {backgroundColor: '#b89ad6'}]}>
            <Text>ADD GUEST</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
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
        <TouchableOpacity style={styles.edit}>
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
