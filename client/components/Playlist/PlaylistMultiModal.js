/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import {FlashMessage} from '../FlashMessage';
import FetchContext from '../../contexts/FetchContext';
import UserContext from '../../contexts/UserContext';
import MultiModalContext from '../../contexts/MultiModalContext';
import {
  DeletePlaylist,
  AddGuestToPlaylist,
  RemoveGuestFromPlaylist,
  DeleteSong,
} from '../../api/PlaylistEndpoint';

const PlaylistMultiModal = props => {
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  const {setMustFetch} = useContext(FetchContext);
  const {user} = useContext(UserContext);
  const {multiModalContext, setMultiModalContext} =
    useContext(MultiModalContext);

  if (props.playlist !== undefined) {
    const flashMessageFailure = 'An error has occurred, please retry later!';

    const flashMessageSuccess = () => {
      if (multiModalContext === 'delete') {
        return `${props.playlist.name} has been successfully deleted!`;
      } else if (multiModalContext === 'add') {
        return `${props.playlist.name} has been successfully added to your playlists!`;
      } else if (multiModalContext === 'remove') {
        return `${props.playlist.name} has been successfully removed from your playlists!`;
      } else if (multiModalContext === 'delete song') {
        return `${props.song.name} has been successfully deleted!`;
      }
    };

    const getModalText = () => {
      if (multiModalContext === 'delete') {
        return `Delete ${props.playlist.name}?`;
      } else if (multiModalContext === 'add') {
        return `Add ${props.playlist.name} to your playlists?`;
      } else if (multiModalContext === 'remove') {
        return `Remove ${props.playlist.name} from your playlists?`;
      } else if (multiModalContext === 'delete song') {
        return `Delete ${props.song.name}?`;
      }
    };

    return (
      <View style={styles.mainContainer}>
        <View
          visible={props.multiPlaylistModal}
          onDismiss={() => props.setMultiPlaylistModal(false)}
          style={styles.dialogContainer}>
          <Title style={{padding: 20}}>{getModalText()}</Title>
          <View style={styles.dialogActionContainer}>
            <Button
              color="#899ed6"
              onPress={() => {
                props.setMultiPlaylistModal(false);
                if (inputIsEmpty) {
                  setInputIsEmpty(false);
                }
              }}>
              No
            </Button>
            <Button
              color="#899ed6"
              onPress={() => {
                let responseStatus;

                if (multiModalContext === 'delete') {
                  responseStatus = DeletePlaylist(props.playlist.id);
                } else if (multiModalContext === 'add') {
                  responseStatus = AddGuestToPlaylist(
                    props.playlist.id,
                    user.id,
                  );
                } else if (multiModalContext === 'remove') {
                  responseStatus = RemoveGuestFromPlaylist(
                    props.playlist.id,
                    user.id,
                  );
                } else if (multiModalContext === 'delete song') {
                  responseStatus = DeleteSong(props.playlist.id, props.song.id);
                }

                responseStatus.then(status => {
                  FlashMessage(
                    status,
                    flashMessageSuccess(),
                    flashMessageFailure,
                  );

                  setMustFetch(true);
                  setMultiModalContext('hidden');
                });

                props.setMultiPlaylistModal(false);
              }}>
              I'm sure
            </Button>
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default PlaylistMultiModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
  },
  dialogContainer: {
    backgroundColor: '#f3f1f4',
    borderRadius: 5,
    width: '100%',
  },
  dialogActionContainer: {
    backgroundColor: '#e8e6e9',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
});
