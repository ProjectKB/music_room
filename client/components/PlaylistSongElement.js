import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Subheading, Divider, Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMusic, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import TextTicker from 'react-native-text-ticker';

const PlaylistSongElement = props => {
  return (
    <>
      <TouchableOpacity style={styles.playlistElementContainer}>
        <FontAwesomeIcon size={50} icon={faMusic} />
        <View style={styles.playlistElementContent}>
          <View style={{marginLeft: 10}}>
            <TextTicker
              style={styles.songPlayerTitleFont}
              duration={10000}
              loop
              scroll={false}
              repeatSpacer={50}
              marqueeDelay={1000}>
              <Subheading>{props.song.name}</Subheading>
            </TextTicker>
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
});
