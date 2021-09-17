/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {FetchPlaylistSong} from '../api/PlaylistEndpoint';
import SearchBar from '../components/SearchBar';
import PlaylistSongList from '../components/Playlist/PlaylistSongList';
import PlaylistMultiModal from '../components/Playlist/PlaylistMultiModal';
import CustomModal from '../components/CustomModal';
import {Playlist} from '../types/Types';

type SongsListProps = {
  playlist: Playlist;
  playlistCollection: Playlist[];
  setPlaylistCollection: React.Dispatch<React.SetStateAction<Playlist[]>>;
  navigation: {setOptions: (arg0: {title: any}) => void};
  screen: 'Playlist' | 'Search';

  deletionPlaylistModal?: boolean;
  setDeletionPlaylistModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SongsList = (props: SongsListProps) => {
  const [playlistSongCollection, setPlaylistSongCollection] =
    useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [songToDeleteIndex, setSongToDeleteIndex] = useState(undefined);
  const [deletionPlaylistModal, setDeletionPlaylistModal] = useState(false);

  const fetchPlaylistSong = useCallback(() => {
    if (playlistSongCollection !== undefined) {
      FetchPlaylistSong(
        setPlaylistSongCollection,
        searchQuery,
        props.playlist.id,
      );
    } else {
      setPlaylistSongCollection(props.playlist.songs);
    }
  }, [searchQuery, props.playlistCollection]);

  useEffect(() => {
    props.navigation.setOptions({title: props.playlist.name});
    fetchPlaylistSong();
  }, [fetchPlaylistSong]);

  return (
    <View style={styles.mainContainer}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <ScrollView style={styles.playlistList}>
        <PlaylistSongList
          playlistSongCollection={
            playlistSongCollection === undefined
              ? props.playlist.songs
              : playlistSongCollection
          }
          setDeletionPlaylistModal={setDeletionPlaylistModal}
          setSongToDeleteIndex={setSongToDeleteIndex}
          playlist={props.playlist}
          screen={props.screen}
        />
      </ScrollView>
      <CustomModal
        modalVisibility={deletionPlaylistModal}
        setModalVisibility={setDeletionPlaylistModal}
        secu={playlistSongCollection}
        Component={() => (
          <PlaylistMultiModal
            setMultiPlaylistModal={setDeletionPlaylistModal}
            song={playlistSongCollection[songToDeleteIndex]}
            playlist={props.playlist}
          />
        )}
      />
    </View>
  );
};

export default SongsList;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
  mainContainer: {
    backgroundColor: '#1a1a1a',
    flex: 1,
  },
});
