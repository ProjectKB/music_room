import React from 'react';
import {Text} from 'react-native-paper';
import {PlaylistType, Setter, Song} from '../../Types/Types';
import SearchSongElement from './SearchSongElement';

type SearchSongListProps = {
  searchCollection: PlaylistType[] | Song[];
  playlistCollection: PlaylistType[];

  setSongToAdd: Setter<Song>;
  setModalVisibility: Setter<boolean>;
};

const SearchSongList = (props: SearchSongListProps) =>
  props.searchCollection.length !== 0 ? (
    <>
      {props.searchCollection.map((elem: any) => (
        <SearchSongElement
          key={elem.etag}
          id={elem.id.videoId}
          picture={elem.snippet.thumbnails.default.url}
          title={elem.snippet.title}
          channelTitle={elem.snippet.channelTitle}
          setSongToAdd={props.setSongToAdd}
          setModalVisibility={props.setModalVisibility}
          playlistCollection={props.playlistCollection}
        />
      ))}
    </>
  ) : (
    <Text>There is no result here.</Text>
  );

export default SearchSongList;
