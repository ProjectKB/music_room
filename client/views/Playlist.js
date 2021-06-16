/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import SearchBar from '../components/SearchBar';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistContent from '../components/Playlist/PlaylistContent';
import FetchContext from '../contexts/FetchContext';

const Playlist = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlistToDeleteIndex, setPlaylistToDeleteIndex] = useState(undefined);

  const {mustFetch, setMustFetch} = useContext(FetchContext);

  const fetchPlaylist = useCallback(() => {
    FetchPlaylistList(props.setPlaylistCollection, searchQuery);

    if (mustFetch) {
      setMustFetch(false);
    }
  }, [searchQuery, mustFetch]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      <PlaylistContent
        navigation={props.navigation}
        playlistCollection={props.playlistCollection}
        setPlaylistCollection={props.setPlaylistCollection}
        creationPlaylistModal={props.creationPlaylistModal}
        setCreationPlaylistModal={props.setCreationPlaylistModal}
        deletionPlaylistModal={props.deletionPlaylistModal}
        setDeletionPlaylistModal={props.setDeletionPlaylistModal}
        playlistToDeleteIndex={playlistToDeleteIndex}
        setPlaylistToDeleteIndex={setPlaylistToDeleteIndex}
      />
    </>
  );
};

export default Playlist;
