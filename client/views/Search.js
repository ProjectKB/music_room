/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import SearchChips from '../components/SearchChips';
import SearchContext from '../contexts/SearchContext';
import SearchSong from '../components/SearchSong';
import {ReadSong} from '../api/SearchEndpoint';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chipSelected, setChipSelected] = useState('Songs');
  const [collection, setCollection] = useState([]);
  const [maxResults, setMaxResults] = useState(10);

  const fetchGlobal = useCallback(() => {
    if (searchQuery !== '') {
      if (chipSelected === 'Songs') {
        ReadSong(setCollection, searchQuery);
        setMaxResults(10);
      }
    } else {
      setCollection([]);
    }
  }, [searchQuery]);

  const riseMaxResults = useCallback(() => {
    if (searchQuery !== '') {
      ReadSong(setCollection, searchQuery, maxResults);
    }
  }, [maxResults]);

  useEffect(() => {
    fetchGlobal();
  }, [fetchGlobal]);

  useEffect(() => {
    riseMaxResults();
  }, [riseMaxResults]);

  const ElementList = () => {
    if (chipSelected === 'Songs') {
      return (
        <SearchSong
          collection={collection}
          setCollection={setCollection}
          setMaxResults={setMaxResults}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <View style={{flex: 1}}>
        <PlaylistSearchBar context={SearchContext} opacity={1} />
        {searchQuery !== '' ? (
          <SearchChips
            chipSelected={chipSelected}
            setChipSelected={setChipSelected}
          />
        ) : null}
        <ElementList />
      </View>
    </SearchContext.Provider>
  );
};

export default Search;
