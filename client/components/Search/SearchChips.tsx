/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {ChipValue, Setter} from '../../Types/Types';

type SearchChipsProps = {
  chipSelected: ChipValue;
  setChipSelected: Setter<ChipValue>;
};

const SearchChips = (props: SearchChipsProps) => (
  <View style={styles.chipsContainer}>
    {['Global', 'Song', 'Playlist', 'Event', 'User'].map(chipName => (
      <Chip
        style={{
          backgroundColor:
            props.chipSelected === chipName ? '#706f71' : '#474749',
        }}
        key={chipName}
        textStyle={{color: 'white'}}
        onPress={() => props.setChipSelected(chipName as ChipValue)}>
        {chipName}
      </Chip>
    ))}
  </View>
);

export default SearchChips;

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});
