/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {FetchPlaylistGuest} from '../api/PlaylistEndpoint';
import {FetchUserFriends} from '../api/UserEndpoint';
import {FlashMessage} from '../components/FlashMessage';
import PlaylistEditionContent from '../components/Playlist/PlaylistEditionContent';
import UserContext from '../contexts/UserContext';
import PlaylistUserFriendPickerModal from '../components/Playlist/PlaylistUserFriendPickerModal';
import CustomModal from '../components/CustomModal';

const EditPlaylist = props => {
  const [guestCollection, setGuestCollection] = useState([{id: '', login: ''}]);
  const [newGuestCollection, setNewGuestCollection] = useState([]);

  const [friendCollection, setFriendCollection] = useState(['']);
  const [fetchGuest, setFetchGuest] = useState(false);
  const [friendPickerModal, setFriendPickerModal] = useState(false);
  const [guestContext, setGuestContext] = useState('');
  const [guestPayload, setGuestPayload] = useState([]);

  const {user} = useContext(UserContext);

  const fetchPlaylistGuest = useCallback(() => {
    if (props.playlist.guests !== undefined) {
      FetchPlaylistGuest(props.playlist.id).then(res => {
        if (res) {
          setGuestCollection(res);
        } else {
          FlashMessage(false, '', 'An error has occurred, please retry later!');
        }
      });
    }
  }, [fetchGuest]);

  useEffect(() => {
    fetchPlaylistGuest();
  }, [fetchPlaylistGuest]);

  const fetchUserFriends = useCallback(() => {
    if (user.friends !== undefined) {
      FetchUserFriends(user.id).then(res => {
        if (res) {
          setFriendCollection(res);
        } else {
          FlashMessage(false, '', 'An error has occurred, please retry later!');
        }
      });
    }
  }, []);

  useEffect(() => {
    props.navigation.setOptions({title: `Edit ${props.playlist.name}`});
  }, []);

  useEffect(() => {
    fetchUserFriends();
  }, [fetchUserFriends]);

  return (
    <>
      <PlaylistEditionContent
        guestCollection={guestCollection}
        setGuestCollection={setGuestCollection}
        playlist={props.playlist}
        modalVisibility={friendPickerModal}
        setModalVisibility={setFriendPickerModal}
        setGuestContext={setGuestContext}
        newGuestCollection={newGuestCollection}
        setNewGuestCollection={setNewGuestCollection}
        guestPayload={guestPayload}
        setGuestPayload={setGuestPayload}
      />
      <CustomModal
        modalVisibility={friendPickerModal}
        setModalVisibility={setFriendPickerModal}
        secu={true}
        Component={() => (
          <PlaylistUserFriendPickerModal
            friendCollection={friendCollection}
            newGuestCollection={newGuestCollection}
            setNewGuestCollection={setNewGuestCollection}
            setModalVisibility={setFriendPickerModal}
            playlist={props.playlist}
            guestContext={guestContext}
            guestPayload={guestPayload}
            setGuestPayload={setGuestPayload}
          />
        )}
      />
    </>
  );
};

export default EditPlaylist;

const styles = StyleSheet.create({});
