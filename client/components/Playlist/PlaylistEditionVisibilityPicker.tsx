/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {PlaylistStatus, PlaylistType, Setter, User} from '../../types/Types';

type PlaylistEditionVisibilityPickerProps = {
  user: User;
  playlistStatus: PlaylistStatus;
  playlist: PlaylistType;

  setPlaylistStatus: Setter<PlaylistStatus>;
};

const PlaylistEditionVisibilityPicker = (
  props: PlaylistEditionVisibilityPickerProps,
) =>
  props.user.id === props.playlist.owner_id ? (
    <RadioButton.Group
      onValueChange={value => {
        props.setPlaylistStatus(value as PlaylistStatus);
      }}
      value={props.playlistStatus}>
      <View style={styles.radioButtonGroup}>
        <View style={styles.radioButton}>
          <RadioButton
            color="#899ed6"
            uncheckedColor="white"
            value="public"
            status={props.playlistStatus === 'public' ? 'checked' : 'unchecked'}
          />
          <Text style={{color: 'white'}}>Public</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            color="#899ed6"
            uncheckedColor="white"
            value="private"
            status={
              props.playlistStatus === 'private' ? 'checked' : 'unchecked'
            }
          />
          <Text style={{color: 'white'}}>Private</Text>
        </View>
      </View>
    </RadioButton.Group>
  ) : null;

export default PlaylistEditionVisibilityPicker;

const styles = StyleSheet.create({
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
});
