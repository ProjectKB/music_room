import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Subheading, Divider, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCameraRetro, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import TextTicker from 'react-native-text-ticker';
import PlaylistContext from '../contexts/PlaylistContext';

const PlaylistElement = props => {
  const {playlist, setPlaylist} = useContext(PlaylistContext);

  const SongNumber = songNumberProps => {
    const songNumber =
      songNumberProps.playlist.songs !== undefined
        ? songNumberProps.playlist.songs.length
        : 0;

    return songNumber <= 1 ? (
      <Text>{songNumber.toString()} song</Text>
    ) : (
      <Text>{songNumber.toString()} songs</Text>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.playlistElementContainer}
        onPress={() => {
          setPlaylist(props.playlist);
          props.navigation.navigate('SongDetails');
        }}>
        <FontAwesomeIcon size={70} icon={faCameraRetro} />
        <View style={styles.playlistElementContent}>
          <View style={{marginLeft: 10}}>
            <TextTicker
              style={styles.songPlayerTitleFont}
              duration={10000}
              loop
              scroll={false}
              repeatSpacer={50}
              marqueeDelay={1000}>
              <Subheading>{props.playlist.name}</Subheading>
            </TextTicker>
            <SongNumber playlist={props.playlist} />
          </View>
          <TouchableOpacity>
            <FontAwesomeIcon size={20} icon={faEllipsisV} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Divider />
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
