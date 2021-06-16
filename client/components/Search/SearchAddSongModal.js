/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlashMessage} from '../FlashMessage';
import {Button, Divider, Title, Text} from 'react-native-paper';

const SearchAddSongModal = props => {
  const flashMessageSuccess = `${props.songToAdd.name} has been successfully added to x!`;
  const flashMessageFailure = 'An error has occurred, please retry later!';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.modalContentContainer}>
        <View style={{padding: 20}}>
          <Title>Add {props.songToAdd.name} to a playlist?</Title>
        </View>
        <Divider />
        <View style={styles.picker}>
          <Text>I'll be a picker soon</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            color="#899ed6"
            onPress={() => {
              props.setModalVisibility(false);
            }}>
            No
          </Button>
          <Button
            color="#899ed6"
            onPress={() => {
              // const responseStatus = props.deleteFunction();

              // responseStatus.then(status =>
              //   FlashMessage(
              //     status,
              //     flashMessageSuccess,
              //     flashMessageFailure,
              //   ),
              // );
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
  },
  modalContentContainer: {
    marginHorizontal: 25,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  picker: {
    backgroundColor: 'white',
    padding: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',
  },
});
