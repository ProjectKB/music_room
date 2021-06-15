/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import PlaylistList from './PlaylistList';
import PlaylistCreationModal from './PlaylistCreationModal';
import PlaylistDeletionModal from './PlaylistDeletionModal';
import {DeletePlaylist} from '../../api/PlaylistEndpoint';

const PlaylistContent = props => {
  const [playlistToDeleteIndex, setPlaylistToDeleteIndex] = useState(undefined);

  return (
    <>
      <ScrollView style={{margin: 10}}>
        <PlaylistList
          playlistCollection={props.playlistCollection}
          navigation={props.navigation}
          setDeletionPlaylistModal={props.setDeletionPlaylistModal}
          setPlaylistToDeleteIndex={setPlaylistToDeleteIndex}
        />
      </ScrollView>
      <PlaylistCreationModal
        creationPlaylistModal={props.creationPlaylistModal}
        setCreationPlaylistModal={props.setCreationPlaylistModal}
        setPlaylistCollection={props.setPlaylistCollection}
      />
      <PlaylistDeletionModal
        deletionPlaylistModal={props.deletionPlaylistModal}
        setDeletionPlaylistModal={props.setDeletionPlaylistModal}
        toDelete={props.playlistCollection[playlistToDeleteIndex]}
        deleteFunction={
          props.playlistCollection[playlistToDeleteIndex] !== undefined
            ? () =>
                DeletePlaylist(
                  props.setPlaylistCollection,
                  props.playlistCollection[playlistToDeleteIndex].id,
                )
            : undefined
        }
      />
    </>
  );
};

export default PlaylistContent;
