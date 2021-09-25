/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native-paper';
import {PlaylistType, ScreenType, Setter} from '../../types/Types';
import PlaylistElement from './PlaylistElement';

type PlaylistListProps = {
  playlistCollection: PlaylistType[];
  screen: ScreenType;
  searchQuery: string;
  navigation: any;

  setGuestPickerModal: Setter<boolean>;
  setMultiPlaylistModal: Setter<boolean>;
  setPlaylistIndex: Setter<number>;
};

const PlaylistList = (props: PlaylistListProps) =>
  props.playlistCollection.length === 0 ||
  (props.screen === 'Search' && props.searchQuery === '') ? (
    <Text style={{color: 'white'}}>There is no playlist here.</Text>
  ) : (
    <>
      {props.playlistCollection.map((elem, index) => (
        <PlaylistElement
          key={elem.id}
          playlist={elem}
          navigation={props.navigation}
          setGuestPickerModal={props.setGuestPickerModal}
          setMultiPlaylistModal={props.setMultiPlaylistModal}
          setPlaylistIndex={props.setPlaylistIndex}
          index={index}
          screen={props.screen}
        />
      ))}
    </>
  );

export default PlaylistList;
