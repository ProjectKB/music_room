import React from 'react';
import {Text} from 'react-native-paper';
import SearchSongElement from './SearchSongElement';

const SearchSongList = props => {
  const SearchCollection = () => {
    if (props.searchCollection.length !== 0) {
      return props.searchCollection.map(elem => {
        return (
          <SearchSongElement
            key={elem.etag}
            id={elem.id.videoId}
            picture={elem.snippet.thumbnails.default.url}
            title={elem.snippet.title}
            channelTitle={elem.snippet.channelTitle}
            setSongToAdd={props.setSongToAdd}
            setModalVisibility={props.setModalVisibility}
          />
        );
      });
    } else {
      return <Text>There is no result here.</Text>;
    }
  };

  return <SearchCollection />;
};

export default SearchSongList;
