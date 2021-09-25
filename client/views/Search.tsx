/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import SearchChips from '../components/Search/SearchChips';
import {ReadSong} from '../api/SearchEndpoint';
import {FetchPlaylistList} from '../api/PlaylistEndpoint';
import SearchElementList from '../components/Search/SearchElementList';
import FetchContext from '../contexts/FetchContext';
import {ChipValue, PlaylistType, Setter, Song} from '../types/Types';

type SearchProps = {
  navigation: any;
  collection: PlaylistType[] | Song[];

  setCollection: Setter<PlaylistType[] | Song[]>;
};

const Search = (props: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chipSelected, setChipSelected] = useState<ChipValue>('Playlist');
  const [maxResults, setMaxResults] = useState(10);
  const [multiPlaylistModal, setMultiPlaylistModal] = useState(false);
  const [playlistCollection, setPlaylistCollection] = useState(undefined);

  const {mustFetch, setMustFetch} = useContext(FetchContext);

  const fetchGlobal = useCallback(() => {
    if (chipSelected === 'Song') {
      ReadSong(searchQuery).then(res =>
        props.setCollection(res ? res.items : []),
      );

      FetchPlaylistList('', 'picker').then(res =>
        setPlaylistCollection(res ? res : []),
      );

      setMaxResults(10);
    } else if (chipSelected === 'Playlist') {
      FetchPlaylistList(searchQuery, 'search').then(res =>
        props.setCollection(res ? res : []),
      );

      if (setMustFetch) {
        setMustFetch(false);
      }
    }
  }, [searchQuery, chipSelected, mustFetch]);

  const riseMaxResults = useCallback(() => {
    if (searchQuery !== '') {
      ReadSong(searchQuery, maxResults).then(res =>
        props.setCollection(res ? res.items : []),
      );
    }
  }, [maxResults]);

  useEffect(() => {
    fetchGlobal();
  }, [fetchGlobal]);

  useEffect(() => {
    riseMaxResults();
  }, [riseMaxResults]);

  return (
    <View style={styles.mainContainer}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {searchQuery !== '' && (
        <SearchChips
          chipSelected={chipSelected}
          setChipSelected={setChipSelected}
        />
      )}
      <SearchElementList
        navigation={props.navigation}
        searchQuery={searchQuery}
        chipSelected={chipSelected}
        collection={props.collection}
        setCollection={props.setCollection}
        playlistCollection={playlistCollection}
        setMaxResults={setMaxResults}
        multiPlaylistModal={multiPlaylistModal}
        setMultiPlaylistModal={setMultiPlaylistModal}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1a1a1a',
    flex: 1,
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
// import React, {useState, useCallback, useEffect, useContext} from 'react';
// import {View, StyleSheet} from 'react-native';
// import SearchBar from '../components/SearchBar';
// import SearchChips from '../components/Search/SearchChips';
// import {ReadSong} from '../api/SearchEndpoint';
// import {FetchPlaylistList} from '../api/PlaylistEndpoint';
// import SearchElementList from '../components/Search/SearchElementList';
// import FetchContext from '../contexts/FetchContext';
// import {ChipValue, PlaylistType, Setter, Song} from '../types/Types';

// type SearchProps = {
//   navigation: any;
//   collection: PlaylistType[] | Song[];

//   setCollection: Setter<PlaylistType[] | Song[]>;
// };

// const Search = (props: SearchProps) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [chipSelected, setChipSelected] = useState<ChipValue>('Playlist');
//   const [maxResults, setMaxResults] = useState(10);
//   const [multiPlaylistModal, setMultiPlaylistModal] = useState(false);
//   const [playlistCollection, setPlaylistCollection] = useState(undefined);

//   const {mustFetch, setMustFetch} = useContext(FetchContext);

//   const fetchGlobal = useCallback(() => {
//     if (chipSelected === 'Song') {
//       ReadSong(searchQuery).then(res => {
//         console.log(res);
//         res !== false && props.setCollection(res !== null ? res.items : []);
//       });

//       FetchPlaylistList('', 'picker').then(
//         res => res !== false && setPlaylistCollection(res !== null ? res : []),
//       );

//       setMaxResults(10);
//     } else if (chipSelected === 'Playlist') {
//       FetchPlaylistList(searchQuery, 'search').then(
//         res => res !== false && props.setCollection(res !== null ? res : []),
//       );

//       if (setMustFetch) {
//         setMustFetch(false);
//       }
//     }
//   }, [searchQuery, chipSelected, mustFetch]);

//   const riseMaxResults = useCallback(() => {
//     if (searchQuery !== '') {
//       ReadSong(searchQuery, maxResults).then(
//         res => res && props.setCollection(res !== null ? res.items : []),
//       );
//     }
//   }, [maxResults]);

//   useEffect(() => {
//     fetchGlobal();
//   }, [fetchGlobal]);

//   useEffect(() => {
//     riseMaxResults();
//   }, [riseMaxResults]);

//   return (
//     <View style={styles.mainContainer}>
//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//       {searchQuery !== '' && (
//         <SearchChips
//           chipSelected={chipSelected}
//           setChipSelected={setChipSelected}
//         />
//       )}
//       <SearchElementList
//         navigation={props.navigation}
//         searchQuery={searchQuery}
//         chipSelected={chipSelected}
//         collection={props.collection}
//         setCollection={props.setCollection}
//         playlistCollection={playlistCollection}
//         setMaxResults={setMaxResults}
//         multiPlaylistModal={multiPlaylistModal}
//         setMultiPlaylistModal={setMultiPlaylistModal}
//       />
//     </View>
//   );
// };

// export default Search;

// const styles = StyleSheet.create({
//   mainContainer: {
//     backgroundColor: '#1a1a1a',
//     flex: 1,
//   },
// });
