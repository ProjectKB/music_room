/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBar from '../components/SearchBar';
import {FetchPlaylistList, FetchPlaylistGuest} from '../api/PlaylistEndpoint';
import PlaylistContent from '../components/Playlist/PlaylistContent';
import FetchContext from '../contexts/FetchContext';
import {FlashMessage} from '../components/FlashMessage';
import {PlaylistType, Setter} from '../types/Types';

type PlaylistProps = {
  playlistCollection: PlaylistType[];
  navigation: any;
  creationPlaylistModal: boolean;
  multiPlaylistModal: boolean;

  setCreationPlaylistModal: Setter<boolean>;
  setMultiPlaylistModal: Setter<boolean>;
  setPlaylistCollection: Setter<PlaylistType[]>;
};

const Playlist = (props: PlaylistProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlistIndex, setPlaylistIndex] = useState(undefined);
  const [guestPickerModal, setGuestPickerModal] = useState(false);
  const [guestCollection, setGuestCollection] = useState([{id: '', login: ''}]);

  const {mustFetch, setMustFetch} = useContext(FetchContext);

  const fetchPlaylist = useCallback(() => {
    FetchPlaylistList(props.setPlaylistCollection, searchQuery, 'playlist');

    if (mustFetch) {
      setMustFetch(false);
    }
  }, [searchQuery, mustFetch]);

  const fetchGuest = useCallback(() => {
    if (guestPickerModal) {
      FetchPlaylistGuest(props.playlistCollection[playlistIndex].id).then(
        res => {
          if (res) {
            setGuestCollection(res);
          } else {
            setGuestPickerModal(false);
            FlashMessage(
              false,
              '',
              'An error has occurred, please retry later!',
            );
          }
        },
      );
    }
  }, [guestPickerModal]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  useEffect(() => {
    fetchGuest();
  }, [fetchGuest]);

  return (
    <View style={styles.mainContainer}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <PlaylistContent
        navigation={props.navigation}
        playlistCollection={props.playlistCollection}
        setPlaylistCollection={props.setPlaylistCollection}
        creationPlaylistModal={props.creationPlaylistModal}
        setCreationPlaylistModal={props.setCreationPlaylistModal}
        multiPlaylistModal={props.multiPlaylistModal}
        setMultiPlaylistModal={props.setMultiPlaylistModal}
        playlistIndex={playlistIndex}
        setPlaylistIndex={setPlaylistIndex}
        guestPickerModal={guestPickerModal}
        setGuestPickerModal={setGuestPickerModal}
        guestCollection={guestCollection}
        screen="Playlist"
      />
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1a1a1a',
    flex: 1,
  },
});
