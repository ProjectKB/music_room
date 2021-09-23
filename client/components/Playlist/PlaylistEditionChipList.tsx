import React from 'react';
import {Setter, Guest, PlaylistType, PlaylistStatus} from '../../types/Types';
import PlaylistEditionChipElement from './PlaylistEditionChipElement';

type PlaylistEditionChipListProps = {
  setter: Setter<Guest[]>;
  collection: Guest[];
  newChips: boolean;
  playlist: PlaylistType;
  playlistStatus: PlaylistStatus;
  guestPayload: Guest[];
  initialGuests: Guest[];

  setPlaylistStatus: Setter<PlaylistStatus>;
  setGuestPayload: Setter<Guest[]>;
  setInitialGuests: Setter<Guest[]>;
};

const PlaylistEditionChipList = (props: PlaylistEditionChipListProps) => {
  if (props.playlist.guests !== undefined) {
    return (
      <>
        {props.collection.map((elem, index) => (
          <PlaylistEditionChipElement
            elem={elem}
            key={elem.id}
            index={index}
            playlist={props.playlist}
            collection={props.collection}
            setter={props.setter}
            newChips={props.newChips}
            playlistStatus={props.playlistStatus}
            setPlaylistStatus={props.setPlaylistStatus}
            guestPayload={props.guestPayload}
            setGuestPayload={props.setGuestPayload}
            initialGuests={props.initialGuests}
            setInitialGuests={props.setInitialGuests}
          />
        ))}
      </>
    );
  } else {
    return null;
  }
};

export default PlaylistEditionChipList;
