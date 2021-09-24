/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import PlaylistList from './PlaylistList';
import PlaylistMultiModal from './PlaylistMultiModal';
import CustomModal from '../CustomModal';
import {PlaylistType, Guest, ScreenType, Setter} from '../../types/Types';
import PlaylistScreenModals from './PlaylistModals';

type PlaylistContentProps = {
  screen: ScreenType;
  playlistCollection: PlaylistType[];
  playlistIndex: number;
  navigation: any;
  multiPlaylistModal: boolean;

  searchQuery?: string;
  guestCollection?: Guest[];
  guestPickerModal?: boolean;
  creationPlaylistModal?: boolean;

  setPlaylistIndex: Setter<number>;
  setMultiPlaylistModal: Setter<boolean>;
  setGuestPickerModal?: Setter<boolean>;
  setCreationPlaylistModal?: Setter<boolean>;
  setPlaylistCollection: Setter<PlaylistType[]>;
};

const PlaylistContent = (props: PlaylistContentProps) => {
  return (
    <>
      <ScrollView style={{margin: 10}}>
        <PlaylistList
          playlistCollection={props.playlistCollection}
          navigation={props.navigation}
          setMultiPlaylistModal={props.setMultiPlaylistModal}
          setGuestPickerModal={props.setGuestPickerModal}
          setPlaylistIndex={props.setPlaylistIndex}
          screen={props.screen}
          searchQuery={props.searchQuery}
        />
      </ScrollView>
      <CustomModal
        modalVisibility={props.multiPlaylistModal}
        setModalVisibility={props.setMultiPlaylistModal}
        secu={props.playlistCollection[props.playlistIndex]}
        Component={() => (
          <PlaylistMultiModal
            setMultiPlaylistModal={props.setMultiPlaylistModal}
            playlist={props.playlistCollection[props.playlistIndex]}
          />
        )}
      />
      <PlaylistScreenModals
        playlistCollection={props.playlistCollection}
        setPlaylistCollection={props.setPlaylistCollection}
        creationPlaylistModal={props.creationPlaylistModal}
        setCreationPlaylistModal={props.setCreationPlaylistModal}
        playlistIndex={props.playlistIndex}
        guestPickerModal={props.guestPickerModal}
        setGuestPickerModal={props.setGuestPickerModal}
        guestCollection={props.guestCollection}
        screen={props.screen}
      />
    </>
  );
};

export default PlaylistContent;
