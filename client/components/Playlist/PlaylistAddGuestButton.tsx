/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {GuestStatus, PlaylistStatus, Setter, User} from '../../types/Types';
import {FlashMessage} from '../FlashMessage';

type PlaylistAddGuestButtonProps = {
  user: User;
  playlistStatus: PlaylistStatus;

  setPlaylistStatus: Setter<PlaylistStatus>;
  setGuestContext: Setter<GuestStatus>;
  setModalVisibility: Setter<boolean>;
};

const PlaylistAddGuestButton = (props: PlaylistAddGuestButtonProps) => (
  <View style={styles.addGuestContainer}>
    {props.playlistStatus === 'private' ? (
      <>
        <TouchableOpacity
          onPress={() => {
            if (props.user.friends !== undefined) {
              props.setGuestContext('contributor');
              props.setModalVisibility(true);
            } else {
              FlashMessage(false, '', "Sorry, you don't have any friends...");
            }
          }}
          style={[styles.addGuest, {backgroundColor: '#899ed6'}]}>
          <Text>ADD CONTRIBUTOR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (props.user.friends !== undefined) {
              props.setGuestContext('guest');
              props.setModalVisibility(true);
            } else {
              FlashMessage(false, '', "Sorry, you don't have any friends...");
            }
          }}
          style={[styles.addGuest, {backgroundColor: '#b89ad6'}]}>
          <Text>ADD GUEST</Text>
        </TouchableOpacity>
      </>
    ) : (
      <TouchableOpacity
        onPress={() => {
          if (props.user.friends !== undefined) {
            props.setGuestContext('contributor');
            props.setModalVisibility(true);
          } else {
            FlashMessage(false, '', "Sorry, you don't have any friends...");
          }
        }}
        style={[styles.addGuest, {width: '95%', backgroundColor: '#899ed6'}]}>
        <Text>ADD CONTRIBUTOR</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default PlaylistAddGuestButton;

const styles = StyleSheet.create({
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
});
