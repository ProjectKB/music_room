import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const SearchSearchBar = props => {
  const {searchQuery, setSearchQuery} = useContext(props.context);

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      style={styles.searchBar}
      selectionColor="gray"
      placeholder="Search"
      onChangeText={text => {
        onChangeSearch(text);
        text !== ''
          ? props.setChipsVisibility(true)
          : props.setChipsVisibility(false);
      }}
      icon={() => <FontAwesomeIcon size={20} color={'gray'} icon={faSearch} />}
    />
  );
};

export default SearchSearchBar;

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
  },
});
