/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import PlaylistSearchBar from '../components/Playlist/PlaylistSearchBar';
import SearchChips from '../components/Search/SearchChips';
import SearchContext from '../contexts/SearchContext';
import SearchSong from '../components/Search/SearchSong';
import {ReadSong} from '../api/SearchEndpoint';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import PlaylistContent from '../components/Playlist/PlaylistContent';

const Search = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chipSelected, setChipSelected] = useState('Playlist');
  const [maxResults, setMaxResults] = useState(10);

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

  const ElementList = () => {
    if (chipSelected === 'Song') {
      return (
        <SearchSong
          collection={props.collection}
          setCollection={props.setCollection}
          setMaxResults={setMaxResults}
        />
      );
    } else if (chipSelected === 'Playlist') {
      return (
        <PlaylistContent
          navigation={props.navigation}
          playlistCollection={props.collection}
          setPlaylistCollection={props.setCollection}
          creationPlaylistModal={props.creationPlaylistModal}
          setCreationPlaylistModal={props.setCreationPlaylistModal}
          deletionPlaylistModal={props.deletionPlaylistModal}
          setDeletionPlaylistModal={props.setDeletionPlaylistModal}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <View style={{flex: 1}}>
        <PlaylistSearchBar
          context={SearchContext}
          opacity={props.deletionPlaylistModal ? 0.4 : 1}
        />
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
