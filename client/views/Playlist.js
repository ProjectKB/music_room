import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import PlaylistList from '../components/PlaylistList';
import {Text, Subheading, Divider, Searchbar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCameraRetro, faSearch} from '@fortawesome/free-solid-svg-icons';

{
  /* <Button
  title="Go to Details"
  onPress={() => navigation.navigate('SongDetails')}
/>; */
}

const Playlist = ({navigation}) => {
  return (
    <>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        icon={() => (
          <FontAwesomeIcon size={20} color={'gray'} icon={faSearch} />
        )}
      />
      <ScrollView style={styles.playlistList}>
        <PlaylistList />
      </ScrollView>
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  playlistList: {
    margin: 10,
  },
  searchBar: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});
