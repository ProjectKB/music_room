/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import SearchSong from './SearchSong';
import PlaylistContent from '../Playlist/PlaylistContent';
import {PlaylistType, Song, Setter} from '../../types/Types';
import {Text} from 'react-native';

const SearchElementList = (props: {
  chipSelected: string;
  collection: PlaylistType[] | Song[];
  playlistCollection: PlaylistType[];
  navigation: any;
  multiPlaylistModal: boolean;
  searchQuery: string;

  setCollection: Setter<PlaylistType[] | Song[]>;
  setMultiPlaylistModal: Setter<boolean>;
  setMaxResults: Setter<number>;
}) => {
  const [playlistIndex, setPlaylistIndex] = useState(undefined);

  const SearchElementListCallback = useCallback(() => {
    if (props.chipSelected === 'Song') {
      return props.collection.length !== 0 ? (
        <SearchSong
          collection={props.collection}
          setCollection={props.setCollection}
          setMaxResults={props.setMaxResults}
          playlistCollection={props.playlistCollection}
        />
      ) : (
        <Text style={{color: 'white', margin: 10}}>
          An Error has occured with YouTube API, please retry later.
        </Text>
      );
    } else if (props.chipSelected === 'Playlist') {
      return (
        <PlaylistContent
          navigation={props.navigation}
          playlistCollection={props.collection as PlaylistType[]}
          setPlaylistCollection={props.setCollection as Setter<PlaylistType[]>}
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
