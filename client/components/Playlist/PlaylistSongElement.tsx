/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Subheading} from 'react-native-paper';
import ShowPlayerContext from '../../contexts/ShowPlayerContext';
import SongIndexContext from '../../contexts/SongIndexContext';
import PlaylistContext from '../../contexts/PlaylistContext';
import MultiModalContext from '../../contexts/MultiModalContext';
import UserContext from '../../contexts/UserContext';
import {Playlist, Song} from '../../types/Types';

type PlaylistSongElementProps = {
  playlist: Playlist;
  index: number;
  screen: 'Playlist' | 'Search';
  song: Song;

  setDeletionPlaylistModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSongToDeleteIndex: React.Dispatch<undefined | number>;

  deletionPlaylistModal?: boolean;
};

const PlaylistSongElement = (props: PlaylistSongElementProps) => {
  const {showPlayer, setShowPlayer} = useContext(ShowPlayerContext);
  const {setSongIndex} = useContext(SongIndexContext);
  const {setPlaylistPlayed} = useContext(PlaylistContext);
  const {setMultiModalContext} = useContext(MultiModalContext);
  const {user} = useContext(UserContext);

  return (
    <>
      <TouchableOpacity
        style={styles.playlistElementContainer}
        onPress={() => {
          if (!showPlayer) {
            setShowPlayer(true);
          }

          setPlaylistPlayed(props.playlist);
          setSongIndex(props.index);
        }}
        onLongPress={() => {
          if (props.screen === 'Playlist') {
            let canEdit = false;

            if (props.playlist.owner_id === user.id) {
              canEdit = true;
            } else if (props.playlist.guests !== undefined) {
              props.playlist.guests.map(guest => {
                if (guest.id === user.id && guest.contributor) {
                  canEdit = true;
                }
              });
            }

            if (canEdit) {
              props.setSongToDeleteIndex(props.index);
              props.setDeletionPlaylistModal(true);
              setMultiModalContext('delete song');
            }
          }
        }}>
        <Image
          style={styles.playlistPictureContainer}
          source={{uri: props.song.picture}}
        />
        <View style={styles.playlistElementContent}>
          <ScrollView horizontal={true} style={{marginHorizontal: 15}}>
            <Subheading style={{color: 'white'}}>{props.song.name}</Subheading>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PlaylistSongElement;

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
    borderRadius: 5,
    width: 75,
    height: 75,
  },
});
