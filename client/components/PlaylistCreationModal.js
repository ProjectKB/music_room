import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Portal,
  Provider,
  Dialog,
  Button,
  Subheading,
  Divider,
} from 'react-native-paper';
import PlaylistCreationModalContext from '../contexts/PlaylistCreationModalContext';

const PlaylistCreationModal = () => {
  const {modalVisibility, setModalVisibility} = useContext(
    PlaylistCreationModalContext,
  );

  return (
    <Provider>
      <Portal>
        <Dialog
          visible={modalVisibility}
          onDismiss={() => setModalVisibility(false)}
          style={styles.dialogContainer}>
          <Dialog.Title>New Playlist Name</Dialog.Title>
          <Divider />
          <Dialog.Content style={{paddingTop: 15, backgroundColor: 'white'}}>
            <Text>Content Here</Text>
          </Dialog.Content>
          <Dialog.Actions style={{backgroundColor: '#f8f8f8'}}>
            <Button
              color="#899ed6"
              onPress={() => {
                setModalVisibility(false);
              }}>
              Cancel
            </Button>
            <Button color="#899ed6" onPress={() => {}}>
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
    backgroundColor: 'lightblue',
  },
});
