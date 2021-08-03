/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import SearchSong from './SearchSong';
import PlaylistContent from '../Playlist/PlaylistContent';

const SearchElementList = props => {
  const [playlistIndex, setPlaylistIndex] = useState(undefined);

  const SearchElementListCallback = useCallback(() => {
    if (props.chipSelected === 'Song') {
      return (
        <SearchSong
          collection={props.collection}
          setCollection={props.setCollection}
          setMaxResults={props.setMaxResults}
          playlistCollection={props.playlistCollection}
        />
      );
    } else if (props.chipSelected === 'Playlist') {
      return (
        <PlaylistContent
          navigation={props.navigation}
          playlistCollection={props.collection}
          setPlaylistCollection={props.setCollection}
          multiPlaylistModal={props.multiPlaylistModal}
          setMultiPlaylistModal={props.setMultiPlaylistModal}
          playlistIndex={playlistIndex}
          setPlaylistIndex={setPlaylistIndex}
          screen="Search"
          searchQuery={props.searchQuery}
        />
      );
    } else {
      return null;
    }
  }, [
    props.collection,
    props.multiPlaylistModal,
    playlistIndex,
    props.searchQuery,
  ]);

  return <SearchElementListCallback />;
};

export default SearchElementList;
