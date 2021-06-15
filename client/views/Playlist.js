/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import SearchBar from '../components/SearchBar';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistContent from '../components/Playlist/PlaylistContent';

const Playlist = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlaylist = useCallback(() => {
    FetchPlaylistList(props.setPlaylistCollection, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  return (
    <>
      <SearchBar
        setSearchQuery={setSearchQuery}
        opacity={
          props.creationPlaylistModal || props.deletionPlaylistModal ? 0.4 : 1
        }
      />
      <PlaylistContent
        navigation={props.navigation}
        playlistCollection={props.playlistCollection}
        setPlaylistCollection={props.setPlaylistCollection}
        creationPlaylistModal={props.creationPlaylistModal}
        setCreationPlaylistModal={props.setCreationPlaylistModal}
        deletionPlaylistModal={props.deletionPlaylistModal}
        setDeletionPlaylistModal={props.setDeletionPlaylistModal}
      />
    </>
  );
};

export default Playlist;
