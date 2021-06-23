/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FlashMessage} from '../FlashMessage';
import {Button, Divider, Title} from 'react-native-paper';
import {AddSong} from '../../api/PlaylistEndpoint';
import FetchContext from '../../contexts/FetchContext';

const SearchAddSongModal = props => {
  const [playlistPicked, setPlaylistPicked] = useState(undefined);

  const {setMustFetch} = useContext(FetchContext);

  const flashMessageSuccess = `${
    props.songToAdd.name
  } has been successfully added to ${
    playlistPicked !== undefined ? playlistPicked.name : null
  }!`;

  const flashMessageFailure = 'An error has occurred, please retry later!';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.modalContentContainer}>
        <View style={{padding: 20}}>
          <Title>Add {props.songToAdd.name} to a playlist?</Title>
        </View>
        <Divider />
        <View style={styles.picker}>
          <Picker
            selectedValue={playlistPicked}
            onValueChange={itemValue => setPlaylistPicked(itemValue)}
            prompt="Playlists">
            {props.playlistCollection.map(item => (
              <Picker.Item
                style={{fontSize: 20}}
                label={item.name}
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
            No
          </Button>
          <Button
            color="#899ed6"
            onPress={() => {
              const responseStatus = AddSong(playlistPicked.id, {
                id: props.songToAdd.id,
                name: props.songToAdd.name,
              });

              responseStatus.then(status => {
                FlashMessage(status, flashMessageSuccess, flashMessageFailure);

                if (status) {
                  setMustFetch(true);
                }
              });

              props.setModalVisibility(false);
            }}>
            Off Course
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SearchAddSongModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
  modalContentContainer: {
    marginHorizontal: 25,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    width: '100%',
  },
  picker: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',
  },
});
