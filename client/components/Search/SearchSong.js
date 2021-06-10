import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import SearchSongList from './SearchSongList';

const SearchSong = props => {
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  return (
    <ScrollView
      style={styles.searchListContainer}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          props.setMaxResults(maxResults => maxResults + 10);
        }
      }}
      scrollEventThrottle={400}>
      <SearchSongList searchCollection={props.collection} />
    </ScrollView>
  );
};

export default SearchSong;

const styles = StyleSheet.create({
  searchListContainer: {
    margin: 15,
    marginBottom: 10,
  },
});
