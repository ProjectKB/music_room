/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import {FlashMessage} from '../FlashMessage';
import FetchContext from '../../contexts/FetchContext';

const PlaylistDeletionModal = props => {
  const [inputIsEmpty, setInputIsEmpty] = useState(false);

  const {setMustFetch} = useContext(FetchContext);

  if (props.toDelete !== undefined) {
    const flashMessageSuccess = `${props.toDelete.name} has been successfully deleted!`;
    const flashMessageFailure = 'An error has occurred, please retry later!';

    return (
      <View style={styles.mainContainer}>
        <View
          visible={props.deletionPlaylistModal}
          onDismiss={() => props.setDeletionPlaylistModal(false)}
          style={styles.dialogContainer}>
          <Title style={{padding: 20}}>Delete {props.toDelete.name}?</Title>
          <View style={styles.dialogActionContainer}>
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

                responseStatus.then(status => {
                  FlashMessage(
                    status,
                    flashMessageSuccess,
                    flashMessageFailure,
                  );

                  setMustFetch(true);
                });
                props.setDeletionPlaylistModal(false);
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

export default PlaylistDeletionModal;

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
