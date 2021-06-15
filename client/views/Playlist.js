/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import PlaylistSearchBar from '../components/Playlist/PlaylistSearchBar';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistListSearchContext from '../contexts/PlaylistListSearchContext';
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
    <PlaylistListSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <PlaylistSearchBar
        context={PlaylistListSearchContext}
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
    </PlaylistListSearchContext.Provider>
  );
};

export default Playlist;
