/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import PlaylistList from './PlaylistList';
import PlaylistCreationModal from './PlaylistCreationModal';
import PlaylistDeletionModal from './PlaylistDeletionModal';
import {DeletePlaylist} from '../../api/PlaylistEndpoint';
import CustomModal from '../CustomModal';

const PlaylistContent = props => (
  <>
    <ScrollView style={{margin: 10}}>
      <PlaylistList
        playlistCollection={props.playlistCollection}
        navigation={props.navigation}
        setDeletionPlaylistModal={props.setDeletionPlaylistModal}
        setPlaylistToDeleteIndex={props.setPlaylistToDeleteIndex}
      />
    </ScrollView>
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
      modalVisibility={props.deletionPlaylistModal}
      setModalVisibility={props.setDeletionPlaylistModal}
      secu={props.playlistCollection[props.playlistToDeleteIndex]}
      Component={() => (
        <PlaylistDeletionModal
          setDeletionPlaylistModal={props.setDeletionPlaylistModal}
          toDelete={props.playlistCollection[props.playlistToDeleteIndex]}
          deleteFunction={() =>
            DeletePlaylist(
              props.setPlaylistCollection,
              props.playlistCollection[props.playlistToDeleteIndex].id,
            )
          }
        />
      )}
    />
  </>
);

export default PlaylistContent;
