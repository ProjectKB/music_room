/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import SearchSearchBar from '../components/SearchSearchBar';
import SearchChips from '../components/SearchChips';
import SearchList from '../components/SearchList';
import SearchContext from '../contexts/SearchContext';
import {ReadSong} from '../api/SearchEndpoint';

const Search = () => {
  const [chipsVisibility, setChipsVisibility] = useState(false);
  const [chipSelected, setChipSelected] = useState('Songs');
  const [collection, setCollection] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const fetchGlobal = useCallback(() => {
    ReadSong(setCollection, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchGlobal();
  }, [fetchGlobal]);

  return (
    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <View style={styles.mainContainer}>
        <SearchSearchBar
          context={SearchContext}
          setChipsVisibility={setChipsVisibility}
        />
        {chipsVisibility ? (
          <SearchChips
            chipSelected={chipSelected}
            setChipSelected={setChipSelected}
          />
        ) : null}
        <ScrollView>
          <SearchList searchCollection={collection} />
        </ScrollView>
      </View>
    </SearchContext.Provider>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
