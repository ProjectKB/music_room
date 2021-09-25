import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Guest, PlaylistStatus, PlaylistType, Setter} from '../../types/Types';
import PlaylistEditionChipList from './PlaylistEditionChipList';

type PlaylistEditionChipsProps = {
  playlist: PlaylistType;
  playlistStatus: PlaylistStatus;
  guestPayload: Guest[];
  initialGuests: Guest[];
  guestCollection: Guest[];
  newGuestCollection: Guest[];

  setPlaylistStatus: Setter<PlaylistStatus>;
  setGuestPayload: Setter<Guest[]>;
  setInitialGuests: Setter<Guest[]>;
  setGuestCollection: Setter<Guest[]>;
  setNewGuestCollection: Setter<Guest[]>;
};

const PlaylistEditionChips = (props: PlaylistEditionChipsProps) => (
  <View style={styles.guestContainer}>
    <ScrollView horizontal={true}>
      {[
        [props.guestCollection, props.setGuestCollection, false],
        [props.newGuestCollection, props.setNewGuestCollection, true],
      ].map(([collection, setter, newChips], key) => (
        <PlaylistEditionChipList
          playlist={props.playlist}
          newChips={newChips as boolean}
          playlistStatus={props.playlistStatus}
          setPlaylistStatus={props.setPlaylistStatus}
          guestPayload={props.guestPayload}
          setGuestPayload={props.setGuestPayload}
          initialGuests={props.initialGuests}
          setInitialGuests={props.setInitialGuests}
          collection={collection as Guest[]}
          setter={setter as Setter<Guest[]>}
          key={key}
        />
      ))}
    </ScrollView>
  </View>
);

export default PlaylistEditionChips;

const styles = StyleSheet.create({
  guestContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 25,
  },
});
