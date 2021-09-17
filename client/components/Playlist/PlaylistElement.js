/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Subheading, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMusic,
  faPen,
  faTrash,
  faPlus,
  faTimes,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../contexts/UserContext';
import MultiModalContext from '../../contexts/MultiModalContext';
import {FlashMessage} from '../FlashMessage';

const PlaylistElement = props => {
  const {user} = useContext(UserContext);
  const {setMultiModalContext} = useContext(MultiModalContext);

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canDelegate, setCanDelegate] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);
  const [canAddToPlaylist, setCanAddToPlaylist] = useState(false);
  const [canRemoveFromPlaylist, setCanRemoveFromPlaylist] = useState(false);

  useEffect(() => {
    if (props.screen === 'Playlist') {
      if (props.playlist.owner_id === user.id) {
        setCanEdit(true);
        setCanDelete(true);
        setCanDelegate(true);
      } else if (props.playlist.guests !== undefined) {
        setCanRemoveFromPlaylist(true);

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
            setMultiModalContext('delete');
            props.setPlaylistIndex(props.index);
            props.setMultiPlaylistModal(true);
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
          onPress={() => {
            setMultiModalContext('add');
            props.setPlaylistIndex(props.index);
            props.setMultiPlaylistModal(true);
          }}>
          <FontAwesomeIcon size={20} icon={faPlus} color="white" />
        </TouchableOpacity>
      ) : null;

      const removeFromPlaylistButton = canRemoveFromPlaylist ? (
        <TouchableOpacity
          onPress={() => {
            setMultiModalContext('remove');
            props.setPlaylistIndex(props.index);
            props.setMultiPlaylistModal(true);
          }}>
          <FontAwesomeIcon
            size={23}
            style={{marginLeft: 17}}
            icon={faTimes}
            color="white"
          />
        </TouchableOpacity>
      ) : null;

      const delegateButton =
        canDelegate && props.playlist.guests ? (
          <TouchableOpacity
            onPress={() => {
              props.setPlaylistIndex(props.index);
              props.setGuestPickerModal(true);
            }}>
            <FontAwesomeIcon
              style={{marginRight: 20}}
              size={23}
              icon={faCrown}
              color="white"
            />
          </TouchableOpacity>
        ) : null;

      return (
        <View style={{flexDirection: 'row'}}>
          {delegateButton}
          {editButton}
          {deleteButton}
          {addToPlaylistButton}
          {removeFromPlaylistButton}
        </View>
      );
    } else {
      return null;
    }
  };

  const PlaylistPicture = () => {
    if (props.playlist.songs !== undefined) {
      if (props.playlist.songs.length < 4) {
        return (
          <Image
            style={styles.playlistPictureContainer}
            source={{uri: props.playlist.songs[0].picture}}
          />
        );
      } else {
        return (
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={[styles.smallPictureDimension, {borderTopLeftRadius: 5}]}
                source={{uri: props.playlist.songs[0].picture}}
              />
              <Image
                style={[
                  styles.smallPictureDimension,
                  {borderBottomLeftRadius: 5},
                ]}
                source={{uri: props.playlist.songs[2].picture}}
              />
            </View>
            <View>
              <Image
                style={[
                  styles.smallPictureDimension,
                  {borderTopRightRadius: 5},
                ]}
                source={{uri: props.playlist.songs[1].picture}}
              />
              <Image
                style={[
                  styles.smallPictureDimension,
                  {borderBottomRightRadius: 5},
                ]}
                source={{uri: props.playlist.songs[3].picture}}
              />
            </View>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.playlistPictureContainer}>
          <FontAwesomeIcon size={50} icon={faMusic} color="white" />
        </View>
      );
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
          canDelete || canEdit || canAddToPlaylist || canRemoveFromPlaylist
            ? setShowActionButton(!showActionButton)
            : FlashMessage(
                false,
                '',
                "You don't have any rights to bring modififications to this playlist.",
              );
        }}>
        <PlaylistPicture />
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
  smallPictureDimension: {
    width: 37.5,
    height: 37.5,
  },
});
