import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Player from '../components/Player';

{
  /* <Button
  title="Go to Details"
  onPress={() => navigation.navigate('SongDetails')}
/>; */
}

const Playlist = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.playlistList}>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
        <Text>Coucou</Text>
      </ScrollView>
      <View style={styles.playerContainer}>
        <Player />
      </View>
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'space-between',
  },
  playlistList: {
    margin: 5,
  },
  playerContainer: {},
});
