/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import PlaylistList from './PlaylistList';
import PlaylistCreationModal from './PlaylistCreationModal';
import PlaylistMultiModal from './PlaylistMultiModal';
import CustomModal from '../CustomModal';

const PlaylistContent = props => {
  return (
    <>
      <ScrollView style={{margin: 10}}>
        <PlaylistList
          playlistCollection={props.playlistCollection}
          navigation={props.navigation}
          setMultiPlaylistModal={props.setMultiPlaylistModal}
          setPlaylistIndex={props.setPlaylistIndex}
          screen={props.screen}
          searchQuery={props.searchQuery}
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
    </>
  );
};

export default PlaylistContent;
