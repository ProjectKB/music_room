/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native-paper';
import PlaylistSongElement from './PlaylistSongElement';
import {PlaylistType, ScreenType, Setter, Song} from '../../types/Types';

type PlaylistSongListProps = {
  playlistSongCollection: undefined | Song[];
  playlist: PlaylistType;
  screen: ScreenType;

  setSongToDeleteIndex: Setter<undefined | number>;
  setDeletionPlaylistModal: Setter<boolean>;

  deletionPlaylistModal?: boolean;
};

const PlaylistSongList = (props: PlaylistSongListProps) =>
  props.playlistSongCollection !== undefined &&
  props.playlistSongCollection.length !== 0 ? (
    <>
      {props.playlistSongCollection.map((elem, index) => (
        <PlaylistSongElement
          key={elem.id}
          song={elem}
          setDeletionPlaylistModal={props.setDeletionPlaylistModal}
          deletionPlaylistModal={props.deletionPlaylistModal}
          setSongToDeleteIndex={props.setSongToDeleteIndex}
          index={index}
          playlist={props.playlist}
          screen={props.screen}
        />
      ))}
    </>
  ) : (
    <Text style={{color: 'white'}}>There is no song here.</Text>
  );

export default PlaylistSongList;
