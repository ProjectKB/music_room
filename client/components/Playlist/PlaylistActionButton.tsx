/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPen,
  faTrash,
  faPlus,
  faTimes,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';
import MultiModalContext from '../../contexts/MultiModalContext';
import {PlaylistType, Setter} from '../../types/Types';

type ShowActionButtonProps = {
  showActionButton: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAddToPlaylist: boolean;
  canRemoveFromPlaylist: boolean;
  canDelegate: boolean;
  navigation: any;
  playlist: PlaylistType;
  index: number;

  setPlaylistIndex: Setter<number>;
  setMultiPlaylistModal: Setter<boolean>;
  setGuestPickerModal: Setter<boolean>;
};

const PlaylistActionButton = (props: ShowActionButtonProps) => {
  const {setMultiModalContext} = useContext(MultiModalContext);

  if (props.showActionButton) {
    const editButton = props.canEdit ? (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('EditPlaylist', {
            playlist: props.playlist,
          })
        }>
        <FontAwesomeIcon size={20} icon={faPen} color="white" />
      </TouchableOpacity>
    ) : null;

    const deleteButton = props.canDelete ? (
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

    const addToPlaylistButton = props.canAddToPlaylist ? (
      <TouchableOpacity
        onPress={() => {
          setMultiModalContext('add');
          props.setPlaylistIndex(props.index);
          props.setMultiPlaylistModal(true);
        }}>
        <FontAwesomeIcon size={20} icon={faPlus} color="white" />
      </TouchableOpacity>
    ) : null;

    const removeFromPlaylistButton = props.canRemoveFromPlaylist ? (
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
      props.canDelegate && props.playlist.guests ? (
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

export default PlaylistActionButton;
