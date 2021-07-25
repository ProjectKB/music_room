/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Subheading, Divider, Text} from 'react-native-paper';
import PlaylistContext from '../../contexts/PlaylistContext';
import SongIndexContext from '../../contexts/SongIndexContext';
import ShowPlayerContext from '../../contexts/ShowPlayerContext';

const SearchSongElement = props => {
  const {setPlaylistPlayed} = useContext(PlaylistContext);
  const {setSongIndex} = useContext(SongIndexContext);
  const {showPlayer, setShowPlayer} = useContext(ShowPlayerContext);

  const fakePlaylistTemplate = {
    songs: [
      {
        id: props.id,
        name: props.title,
      },
    ],
  };

  return (
    <>
      <TouchableOpacity
        style={styles.searchElementContainer}
        onPress={() => {
          if (!showPlayer) {
            setShowPlayer(true);
          }

          setPlaylistPlayed(fakePlaylistTemplate);
          setSongIndex(0);
        }}
        onLongPress={() => {
          props.setSongToAdd({id: props.id, name: props.title});
          props.setModalVisibility(true);
        }}>
        <Image style={styles.pictureContainer} source={{uri: props.picture}} />
        <View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{alignItems: 'flex-end'}}>
            <Subheading style={{color: 'white'}}>{props.title}</Subheading>
          </ScrollView>
          <ScrollView horizontal={true}>
            <Text style={{color: 'white'}}>{props.channelTitle}</Text>
          </ScrollView>
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default SearchSongElement;

const styles = StyleSheet.create({
  searchElementContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  pictureContainer: {
    width: 90,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
  },
});