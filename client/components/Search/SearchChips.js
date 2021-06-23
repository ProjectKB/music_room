import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';

const SearchChips = props => {
  const [chipSelected, setChipSelected] = [
    props.chipSelected,
    props.setChipSelected,
  ];

  return (
    <View style={styles.chipsContainer}>
      <Chip
        mode={chipSelected === 'Global' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Global')}>
        Global
      </Chip>
      <Chip
        mode={chipSelected === 'Song' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Song')}>
        Song
      </Chip>
      <Chip
        mode={chipSelected === 'Playlist' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Playlist')}>
        Playlist
      </Chip>
      <Chip
        mode={chipSelected === 'Event' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Event')}>
        Event
      </Chip>
      <Chip
        mode={chipSelected === 'User' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('User')}>
        User
      </Chip>
    </View>
  );
};

export default SearchChips;

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
