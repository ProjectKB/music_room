import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import PlaylistSearchContext from '../contexts/PlaylistSearchContext';

const PlaylistSearchBar = () => {
  const {searchQuery, setSearchQuery} = useContext(PlaylistSearchContext);

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      style={styles.searchBar}
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
