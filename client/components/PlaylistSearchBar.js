import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const PlaylistSearchBar = () => {
  return (
    <Searchbar
      style={styles.searchBar}
      selectionColor="gray"
      placeholder="Search"
      icon={() => <FontAwesomeIcon size={20} color={'gray'} icon={faSearch} />}
    />
  );
};

export default PlaylistSearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});
