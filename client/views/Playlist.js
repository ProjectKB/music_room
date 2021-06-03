/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import PlaylistList from '../components/PlaylistList';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import {DeletePlaylist, FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistListSearchContext from '../contexts/PlaylistListSearchContext';
import PlaylistCreationModal from '../components/PlaylistCreationModal';
import PlaylistDeletionModal from '../components/PlaylistDeletionModal';

const Playlist = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlistToDeleteIndex, setPlaylistToDeleteIndex] = useState(undefined);

  const fetchPlaylist = useCallback(() => {
    FetchPlaylistList(props.setPlaylistCollection, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  return (
    <PlaylistListSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <PlaylistSearchBar
        context={PlaylistListSearchContext}
        opacity={
          props.creationPlaylistModal || props.deletionPlaylistModal ? 0.4 : 1
        }
      />
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
    </PlaylistListSearchContext.Provider>
  );
};

export default Playlist;

const styles = StyleSheet.create({});
