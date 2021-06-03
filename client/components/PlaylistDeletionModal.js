import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Portal, Provider, Dialog, Button} from 'react-native-paper';
import {FlashMessage} from './FlashMessage';

const PlaylistDeletionModal = props => {
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  if (props.toDelete !== undefined) {
    const flashMessageSuccess = `${props.toDelete.name} has been successfully deleted!`;
    const flashMessageFailure = 'An error has occurred, please retry later!';

    return (
      <Provider>
        <Portal>
          <Dialog
            visible={props.deletionPlaylistModal}
            onDismiss={() => props.setDeletionPlaylistModal(false)}
            style={styles.dialogContainer}>
            <Dialog.Title>Delete {props.toDelete.name}?</Dialog.Title>
            <Dialog.Actions style={styles.dialogActionContainer}>
              <Button
                color="#899ed6"
                onPress={() => {
                  props.setDeletionPlaylistModal(false);
                  if (inputIsEmpty) {
                    setInputIsEmpty(false);
                  }
                }}>
                No
              </Button>
              <Button
                color="#899ed6"
                onPress={() => {
                  const responseStatus = props.deleteFunction();

                  responseStatus.then(status =>
                    FlashMessage(
                      status,
                      flashMessageSuccess,
                      flashMessageFailure,
                    ),
                  );
                  props.setDeletionPlaylistModal(false);
                }}>
                I'm sure
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    );
  } else {
    return null;
  }
};

export default PlaylistDeletionModal;

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  dialogActionContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
