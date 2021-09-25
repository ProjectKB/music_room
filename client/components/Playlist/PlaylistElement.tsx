/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Subheading} from 'react-native-paper';
import UserContext from '../../contexts/UserContext';
import {FlashMessage} from '../FlashMessage';
import {PlaylistType, ScreenType, Setter} from '../../types/Types';
import SongNumber from './SongNumber';
import PlaylistActionButton from './PlaylistActionButton';
import PlaylistPicture from './PlaylistPicture';

type PlaylistElementProps = {
  screen: ScreenType;
  playlist: PlaylistType;
  navigation: any;
  index: number;

  setPlaylistIndex: Setter<number>;
  setMultiPlaylistModal: Setter<boolean>;
  setGuestPickerModal: Setter<boolean>;
};

const PlaylistElement = (props: PlaylistElementProps) => {
  const {user} = useContext(UserContext);

  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canDelegate, setCanDelegate] = useState(false);
  const [canAddToPlaylist, setCanAddToPlaylist] = useState(false);
  const [canRemoveFromPlaylist, setCanRemoveFromPlaylist] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);

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
        <PlaylistPicture {...props.playlist} />
        <View style={styles.playlistElementContent}>
          <View style={{marginLeft: 10}}>
            <Subheading style={{color: 'white'}}>
              {props.playlist.name}
            </Subheading>
            <SongNumber {...props.playlist} />
          </View>
          <PlaylistActionButton
            canEdit={canEdit}
            canDelete={canDelete}
            canDelegate={canDelegate}
            canAddToPlaylist={canAddToPlaylist}
            canRemoveFromPlaylist={canRemoveFromPlaylist}
            playlist={props.playlist}
            showActionButton={showActionButton}
            navigation={props.navigation}
            index={props.index}
            setPlaylistIndex={props.setPlaylistIndex}
            setMultiPlaylistModal={props.setMultiPlaylistModal}
            setGuestPickerModal={props.setGuestPickerModal}
          />
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
});
