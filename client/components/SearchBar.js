import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const SearchBar = props => {
  const onChangeSearch = query => props.setSearchQuery(query);

  return (
    <Searchbar
      style={[styles.searchBar, {opacity: props.opacity}]}
      selectionColor="black"
      placeholder="Search"
      onChangeText={onChangeSearch}
      icon={() => <FontAwesomeIcon size={20} icon={faSearch} />}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#f3f1f4',
    marginHorizontal: 10,
    marginTop: 10,
  },
});
