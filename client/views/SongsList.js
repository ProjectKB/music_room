/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {DeleteSong, FetchPlaylistSong} from '../api/PlaylistEndpoint';
import SearchBar from '../components/SearchBar';
import PlaylistSongList from '../components/Playlist/PlaylistSongList';
import PlaylistDeletionModal from '../components/Playlist/PlaylistDeletionModal';
import CustomModal from '../components/CustomModal';

const SongsList = props => {
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
    <>
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
        />
      </ScrollView>
      <CustomModal
        modalVisibility={deletionPlaylistModal}
        setModalVisibility={setDeletionPlaylistModal}
        secu={playlistSongCollection}
        Component={() => (
          <PlaylistDeletionModal
            setDeletionPlaylistModal={setDeletionPlaylistModal}
            toDelete={playlistSongCollection[songToDeleteIndex]}
            deleteFunction={() =>
              DeleteSong(
                props.playlist.id,
                playlistSongCollection[songToDeleteIndex].id,
              )
            }
          />
        )}
      />
    </>
  );
};

export default SongsList;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
});
