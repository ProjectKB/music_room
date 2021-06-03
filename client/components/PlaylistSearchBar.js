import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const PlaylistSearchBar = props => {
  const {searchQuery, setSearchQuery} = useContext(props.context);

  const onChangeSearch = query => setSearchQuery(query);

  const opacity = {opacity: props.modalVisibility ? 0.3 : 1};

  return (
    <Searchbar
      style={[styles.searchBar, opacity]}
      selectionColor="gray"
      placeholder="Search"
      onChangeText={onChangeSearch}
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
