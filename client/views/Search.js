/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import SearchBar from '../components/SearchBar';
import SearchChips from '../components/Search/SearchChips';
import {ReadSong} from '../api/SearchEndpoint';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import SearchElementList from '../components/Search/SearchElementList';

const Search = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chipSelected, setChipSelected] = useState('Playlist');
  const [maxResults, setMaxResults] = useState(10);
  const [deletionPlaylistModal, setDeletionPlaylistModal] = useState(false);

  const fetchGlobal = useCallback(() => {
    if (searchQuery !== '') {
      if (chipSelected === 'Song') {
        ReadSong(props.setCollection, searchQuery);
        setMaxResults(10);
      } else if (chipSelected === 'Playlist') {
        FetchPlaylistList(props.setCollection, searchQuery);
      }
    } else {
      props.setCollection([]);
    }
  }, [searchQuery, chipSelected]);

  const riseMaxResults = useCallback(() => {
    if (searchQuery !== '') {
      ReadSong(props.setCollection, searchQuery, maxResults);
    }
  }, [maxResults]);

  useEffect(() => {
    fetchGlobal();
  }, [fetchGlobal]);

  useEffect(() => {
    riseMaxResults();
  }, [riseMaxResults]);

  return (
    <View style={{flex: 1}}>
      <SearchBar setSearchQuery={setSearchQuery} />
      {searchQuery !== '' ? (
        <SearchChips
          chipSelected={chipSelected}
          setChipSelected={setChipSelected}
        />
      ) : null}
      <SearchElementList
        navigation={props.navigation}
        chipSelected={chipSelected}
        collection={props.collection}
        setCollection={props.setCollection}
        setMaxResults={setMaxResults}
        deletionPlaylistModal={deletionPlaylistModal}
        setDeletionPlaylistModal={setDeletionPlaylistModal}
      />
    </View>
  );
};

export default Search;
