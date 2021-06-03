/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import PlaylistSongSearchContext from '../contexts/PlaylistSongSearchContext';
import {DeleteSong, FetchPlaylistSong} from '../api/PlaylistEndpoint';
import PlaylistSearchBar from '../components/PlaylistSearchBar';
import PlaylistSongList from '../components/PlaylistSongList';
import PlaylistContext from '../contexts/PlaylistContext';
import PlaylistDeletionModal from '../components/PlaylistDeletionModal';

const SongsList = props => {
  const [playlistSongCollection, setPlaylistSongCollection] =
    useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [songToDeleteIndex, setSongToDeleteIndex] = useState(undefined);

  const {playlistDisplayed, setPlaylistDisplayed} = useContext(PlaylistContext);

  const fetchPlaylistSong = useCallback(() => {
    if (playlistSongCollection !== undefined) {
      FetchPlaylistSong(
        setPlaylistSongCollection,
        searchQuery,
        playlistDisplayed.id,
      );
    } else {
      setPlaylistSongCollection(playlistDisplayed.songs);
    }
  }, [searchQuery, props.playlistCollection]);

  useEffect(() => {
    props.navigation.setOptions({title: playlistDisplayed.name});
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
              ? playlistDisplayed.songs
              : playlistSongCollection
          }
          setDeletionPlaylistModal={props.setDeletionPlaylistModal}
          setSongToDeleteIndex={setSongToDeleteIndex}
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
                  playlistDisplayed.id,
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
