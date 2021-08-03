/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Subheading, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMusic,
  faPen,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../contexts/UserContext';
import {FlashMessage} from '../FlashMessage';
import {AddGuestToPlaylist} from '../../api/PlaylistEndpoint';
import FetchContext from '../../contexts/FetchContext';

const PlaylistElement = props => {
  const {user} = useContext(UserContext);
  const {setMustFetch} = useContext(FetchContext);

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);
  const [canAddToPlaylist, setCanAddToPlaylist] = useState(false);

  useEffect(() => {
    if (props.screen !== 'Search') {
      if (props.playlist.owner_id === user.id) {
        setCanEdit(true);
        setCanDelete(true);
      } else if (props.playlist.guests !== undefined) {
        props.playlist.guests.map(guest => {
          if (guest.id === user.id && guest.contributor) {
            setCanEdit(true);
          }
        });
      }
    } else {
      setCanAddToPlaylist(true);
    }
  }, []);

  const SongNumber = songNumberProps => {
    const songNumber =
      songNumberProps.playlist.songs !== undefined
        ? songNumberProps.playlist.songs.length
        : 0;
    return songNumber <= 1 ? (
      <Text style={{color: 'white'}}>{songNumber.toString()} song</Text>
    ) : (
      <Text style={{color: 'white'}}>{songNumber.toString()} songs</Text>
    );
  };

  const ShowActionButton = () => {
    if (showActionButton) {
      const editButton = canEdit ? (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('EditPlaylist', {
              playlist: props.playlist,
            })
          }>
          <FontAwesomeIcon size={20} icon={faPen} color="white" />
        </TouchableOpacity>
      ) : null;

      const deleteButton = canDelete ? (
        <TouchableOpacity
          onPress={() => {
            props.setPlaylistToDeleteIndex(props.index);
            props.setDeletionPlaylistModal(true);
          }}>
          <FontAwesomeIcon
            style={{marginLeft: 20}}
            size={20}
            icon={faTrash}
            color="white"
          />
        </TouchableOpacity>
      ) : null;

      const addToPlaylistButton = canAddToPlaylist ? (
        <TouchableOpacity
          onPress={() =>
            AddGuestToPlaylist(props.playlist.id, user.id).then(res => {
              FlashMessage(
                res,
                `${props.playlist.name} has been added to your playlists!`,
                'An error has occurred, please retry later!',
              );

              if (res) {
                setMustFetch(true);
              }
            })
          }>
          <FontAwesomeIcon size={20} icon={faPlus} color="white" />
        </TouchableOpacity>
      ) : null;

      return (
        <View style={{flexDirection: 'row'}}>
          {editButton}
          {deleteButton}
          {addToPlaylistButton}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.playlistElementContainer}
        onPress={() =>
          props.navigation.navigate('SongDetails', {playlist: props.playlist})
        }
        onLongPress={() => {
          canDelete || canEdit || canAddToPlaylist
            ? setShowActionButton(!showActionButton)
            : FlashMessage(
                false,
                '',
                "You don't have any rights to bring modififications to this playlist.",
              );
        }}>
        <View style={styles.playlistPictureContainer}>
          <FontAwesomeIcon size={50} icon={faMusic} color="white" />
        </View>
        <View style={styles.playlistElementContent}>
          <View style={{marginLeft: 10}}>
            <Subheading style={{color: 'white'}}>
              {props.playlist.name}
            </Subheading>
            <SongNumber playlist={props.playlist} />
          </View>
          <ShowActionButton />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PlaylistElement;

const styles = StyleSheet.create({
  playlistElementContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  playlistElementContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  playlistPictureContainer: {
    backgroundColor: '#434243',
    borderRadius: 5,
    marginRight: 5,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
