/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View} from 'react-native';
import SearchBar from '../components/SearchBar';
import SearchChips from '../components/Search/SearchChips';
import {ReadSong} from '../api/SearchEndpoint';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import SearchElementList from '../components/Search/SearchElementList';
import FetchContext from '../contexts/FetchContext';

const Search = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chipSelected, setChipSelected] = useState('Playlist');
  const [maxResults, setMaxResults] = useState(10);
  const [deletionPlaylistModal, setDeletionPlaylistModal] = useState(false);
  const [playlistCollection, setPlaylistCollection] = useState(undefined);

  const {mustFetch, setMustFetch} = useContext(FetchContext);

  const fetchGlobal = useCallback(() => {
    if (chipSelected === 'Song') {
      ReadSong(props.setCollection, searchQuery);
      FetchPlaylistList(setPlaylistCollection, '');
      setMaxResults(10);
    } else if (chipSelected === 'Playlist') {
      FetchPlaylistList(props.setCollection, searchQuery);

      if (setMustFetch) {
        setMustFetch(false);
      }
    }
  }, [searchQuery, chipSelected, mustFetch]);

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
        searchQuery={searchQuery}
        chipSelected={chipSelected}
        collection={props.collection}
        setCollection={props.setCollection}
        playlistCollection={playlistCollection}
        setMaxResults={setMaxResults}
        deletionPlaylistModal={deletionPlaylistModal}
        setDeletionPlaylistModal={setDeletionPlaylistModal}
      />
    </View>
  );
};

export default Search;
