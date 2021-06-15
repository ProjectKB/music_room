/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PlaylistSongSearchContext from '../contexts/PlaylistSongSearchContext';
import {DeleteSong, FetchPlaylistSong} from '../api/PlaylistEndpoint';
import PlaylistSearchBar from '../components/Playlist/PlaylistSearchBar';
import PlaylistSongList from '../components/Playlist/PlaylistSongList';
import PlaylistDeletionModal from '../components/Playlist/PlaylistDeletionModal';

const SongsList = props => {
  const [playlistSongCollection, setPlaylistSongCollection] =
    useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [songToDeleteIndex, setSongToDeleteIndex] = useState(undefined);

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
    <PlaylistSongSearchContext.Provider value={{searchQuery, setSearchQuery}}>
      <PlaylistSearchBar
        context={PlaylistSongSearchContext}
        opacity={
          props.creationPlaylistModal || props.deletionPlaylistModal ? 0.4 : 1
        }
      />
      <ScrollView style={styles.playlistList}>
        <PlaylistSongList
          playlistSongCollection={
            playlistSongCollection === undefined
              ? props.playlist.songs
              : playlistSongCollection
          }
          setDeletionPlaylistModal={props.setDeletionPlaylistModal}
          setSongToDeleteIndex={setSongToDeleteIndex}
          playlist={props.playlist}
        />
      </ScrollView>
      <PlaylistDeletionModal
        deletionPlaylistModal={props.deletionPlaylistModal}
        setDeletionPlaylistModal={props.setDeletionPlaylistModal}
        toDelete={
          playlistSongCollection !== undefined
            ? playlistSongCollection[songToDeleteIndex]
            : undefined
        }
        deleteFunction={
          playlistSongCollection !== undefined
            ? () =>
                DeleteSong(
                  props.setPlaylistCollection,
                  props.playlist.id,
                  playlistSongCollection[songToDeleteIndex].id,
                )
            : undefined
        }
      />
    </PlaylistSongSearchContext.Provider>
  );
};

export default SongsList;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
});
