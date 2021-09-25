/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Guest, Setter, PlaylistType, PlaylistStatus} from '../../types/Types';

type PlaylistEditionChipProps = {
  newChips: boolean;
  elem: Guest;
  collection: Guest[];
  index: number;
  playlist: PlaylistType;
  playlistStatus: PlaylistStatus;
  guestPayload: Guest[];
  initialGuests: Guest[];

  setPlaylistStatus: Setter<PlaylistStatus>;
  setGuestPayload: Setter<Guest[]>;
  setInitialGuests: Setter<Guest[]>;
  setter: Setter<Guest[]>;
};

const PlaylistEditionChipElement = (props: PlaylistEditionChipProps) => {
  let chipColor = {backgroundColor: '#899ed6'};

  if (props.playlistStatus === 'private') {
    if (!props.newChips) {
      const guest = props.playlist.guests.find(
        elem => elem.id === props.elem.id,
      );

      if (guest !== undefined) {
        chipColor = {
          backgroundColor:
            guest.contributor !== undefined ? '#899ed6' : '#b89ad6',
        };
      }
    } else {
      chipColor = {
        backgroundColor: props.elem.contributor ? '#899ed6' : '#b89ad6',
      };
    }
  }

  return (
    <TouchableOpacity style={[styles.chipContainer, chipColor]}>
      <Text>{props.elem.login}</Text>
      <TouchableOpacity
        onPress={() => {
          let guestCollectionCopy = [...props.collection];

          guestCollectionCopy.splice(props.index, 1);
          props.setter(guestCollectionCopy);

          if (props.newChips) {
            let guestPayloadCopy = [...props.guestPayload];

            guestPayloadCopy.splice(props.index, 1);
            props.setGuestPayload(guestPayloadCopy);
          } else {
            let guestPayloadCopy = [...props.initialGuests];

            guestPayloadCopy.splice(props.index, 1);
            props.setInitialGuests(guestPayloadCopy);
          }
        }}>
        <FontAwesomeIcon style={{marginLeft: 5}} size={12} icon={faTimes} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlaylistEditionChipElement;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    marginRight: 5,
    marginBottom: 15,
  },
});
