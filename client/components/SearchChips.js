import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
        mode={chipSelected === 'Songs' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Songs')}>
        Songs
      </Chip>
      <Chip
        mode={chipSelected === 'Playlists' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Playlists')}>
        Playlists
      </Chip>
      <Chip
        mode={chipSelected === 'Events' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Events')}>
        Events
      </Chip>
      <Chip
        mode={chipSelected === 'Users' ? 'outlined' : 'flat'}
        onPress={() => setChipSelected('Users')}>
        Users
      </Chip>
    </View>
  );
};

export default SearchChips;

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
