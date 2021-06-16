/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import SearchSong from './SearchSong';
import PlaylistContent from '../Playlist/PlaylistContent';

const SearchElementList = props => {
  const [playlistToDeleteIndex, setPlaylistToDeleteIndex] = useState(undefined);

  const SearchElementListCallback = useCallback(() => {
    if (props.chipSelected === 'Song') {
      return (
        <SearchSong
          collection={props.collection}
          setCollection={props.setCollection}
          setMaxResults={props.setMaxResults}
        />
      );
    } else if (props.chipSelected === 'Playlist') {
      return (
        <PlaylistContent
          navigation={props.navigation}
          playlistCollection={props.collection}
          setPlaylistCollection={props.setCollection}
          deletionPlaylistModal={props.deletionPlaylistModal}
          setDeletionPlaylistModal={props.setDeletionPlaylistModal}
          playlistToDeleteIndex={playlistToDeleteIndex}
          setPlaylistToDeleteIndex={setPlaylistToDeleteIndex}
        />
      );
    } else {
      return null;
    }
  }, [
    props.collection,
    props.deletionPlaylistModal,
    playlistToDeleteIndex,
    props.searchQuery,
  ]);

  return <SearchElementListCallback />;
};

export default SearchElementList;
