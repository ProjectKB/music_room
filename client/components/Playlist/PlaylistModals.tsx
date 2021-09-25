import React from 'react';
import {Setter, PlaylistType, Guest, ScreenType} from '../../types/Types';
import CustomModal from '../CustomModal';
import PlaylistCreationModal from './PlaylistCreationModal';
import PlaylistGuestPickerModal from './PlaylistGuestPickerModal';

type PlaylistScreenModalsProps = {
  screen: ScreenType;
  creationPlaylistModal: boolean;
  guestPickerModal: boolean;
  playlistCollection: PlaylistType[];
  playlistIndex: number;
  guestCollection: Guest[];

  setGuestPickerModal: Setter<boolean>;
  setCreationPlaylistModal: Setter<boolean>;
  setPlaylistCollection: Setter<PlaylistType[]>;
};

const PlaylistScreenModals = (props: PlaylistScreenModalsProps) =>
  props.screen === 'Playlist' ? (
    <>
      <CustomModal
        modalVisibility={props.creationPlaylistModal}
        setModalVisibility={props.setCreationPlaylistModal}
        secu={props.creationPlaylistModal}
        Component={() => (
          <PlaylistCreationModal
            setPlaylistCollection={props.setPlaylistCollection}
            setModalVisibility={props.setCreationPlaylistModal}
          />
        )}
      />
      <CustomModal
        modalVisibility={props.guestPickerModal}
        setModalVisibility={props.setGuestPickerModal}
        secu={props.playlistCollection[props.playlistIndex]}
        Component={() => (
          <PlaylistGuestPickerModal
            guestCollection={props.guestCollection}
            setModalVisibility={props.setGuestPickerModal}
            playlist={props.playlistCollection[props.playlistIndex]}
          />
        )}
      />
    </>
  ) : null;

export default PlaylistScreenModals;
