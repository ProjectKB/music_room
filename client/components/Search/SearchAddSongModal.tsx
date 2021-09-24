/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FlashMessage} from '../FlashMessage';
import {Button, Divider, Title} from 'react-native-paper';
import {AddSong} from '../../api/PlaylistEndpoint';
import FetchContext from '../../contexts/FetchContext';
import PlaylistContext from '../../contexts/PlaylistContext';
import {PlaylistType, Setter, Song} from '../../Types/Types';

type SearchAddSongModalProps = {
  playlistCollection: PlaylistType[];
  songToAdd: Song;

  setModalVisibility: Setter<boolean>;
};

const SearchAddSongModal = (props: SearchAddSongModalProps) => {
  const {playlistPlayed, setPlaylistPlayed} = useContext(PlaylistContext);

  const [playlistPicked, setPlaylistPicked] = useState(
    props.playlistCollection[0],
  );

  const {setMustFetch} = useContext(FetchContext);

  const flashMessageSuccess = `${
    props.songToAdd.name
  } has been successfully added to ${
    playlistPicked !== undefined ? playlistPicked.name : null
  }!`;

  const flashMessageFailure = 'An error has occurred, please retry later!';

  const handlePress = () => {
    const responseStatus = AddSong(playlistPicked.id, {
      id: props.songToAdd.id,
      name: props.songToAdd.name,
      picture: props.songToAdd.picture,
    });

    responseStatus.then(status => {
      FlashMessage(status, flashMessageSuccess, flashMessageFailure);

      if (status) {
        if (
          playlistPlayed.name !== undefined &&
          playlistPlayed.name === playlistPicked.name
        ) {
          let playlistPlayedCopy = {...playlistPlayed};

          playlistPlayedCopy.songs.push({
            id: props.songToAdd.id,
            name: props.songToAdd.name,
            picture: props.songToAdd.picture,
          });

          setPlaylistPlayed(playlistPlayedCopy);
        }

        setMustFetch(true);
      }
    });

    props.setModalVisibility(false);
  };

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
          <Button color="#899ed6" onPress={() => handlePress}>
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
