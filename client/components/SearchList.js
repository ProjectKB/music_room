import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import SearchElement from './SearchElement';

const SearchList = props => {
  const SearchCollection = () => {
    if (props.searchCollection.length !== 0) {
      return props.searchCollection.map(elem => {
        return (
          <SearchElement
            key={elem.etag}
            id={elem.id.videoId}
            picture={elem.snippet.thumbnails.default.url}
            title={elem.snippet.title}
          />
        );
      });
    } else {
      return <Text>There is no result here.</Text>;
    }
  };

  return <SearchCollection />;
};

export default SearchList;

const styles = StyleSheet.create({});
