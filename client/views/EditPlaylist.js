/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {FetchPlaylistGuest} from '../api/PlaylistEndpoint';
import {FlashMessage} from '../components/FlashMessage';
import PlaylistEditionContent from '../components/Playlist/PlaylistEditionContent';

const EditPlaylist = props => {
  const [guestCollection, setGuestCollection] = useState([{id: '', login: ''}]);

  useEffect(() => {
    props.navigation.setOptions({title: `Edit ${props.playlist.name}`});

    if (props.playlist.guests !== undefined) {
      FetchPlaylistGuest(props.playlist.id).then(res => {
        if (res) {
          setGuestCollection(res);
        } else {
          FlashMessage(false, '', 'An error has occurred, please retry later!');
        }
      });
    }
  }, []);

  return (
    <PlaylistEditionContent
      guestCollection={guestCollection}
      setGuestCollection={setGuestCollection}
      playlist={props.playlist}
    />
  );
};

export default EditPlaylist;

const styles = StyleSheet.create({});
