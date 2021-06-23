import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';

const SearchChips = props => {
  const [chipSelected, setChipSelected] = [
    props.chipSelected,
    props.setChipSelected,
  ];

  const chipColor = chipName =>
    chipSelected === chipName ? '#706f71' : '#474749';

  return (
    <View style={styles.chipsContainer}>
      <Chip
        style={{backgroundColor: chipColor('Global')}}
        textStyle={{color: 'white'}}
        onPress={() => setChipSelected('Global')}>
        Global
      </Chip>
      <Chip
        style={{backgroundColor: chipColor('Song')}}
        textStyle={{color: 'white'}}
        onPress={() => setChipSelected('Song')}>
        Song
      </Chip>
      <Chip
        style={{backgroundColor: chipColor('Playlist')}}
        textStyle={{color: 'white'}}
        onPress={() => setChipSelected('Playlist')}>
        Playlist
      </Chip>
      <Chip
        style={{backgroundColor: chipColor('Event')}}
        textStyle={{color: 'white'}}
        onPress={() => setChipSelected('Event')}>
        Event
      </Chip>
      <Chip
        style={{backgroundColor: chipColor('User')}}
        textStyle={{color: 'white'}}
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
