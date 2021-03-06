import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Headline} from 'react-native-paper';

const PlaylistStackHeader = props => {
  return (
    <View style={styles.playlistStackHeaderContainer}>
      <Headline style={styles.playlistStackHeaderTitle}>
        {props.navigation.children}
      </Headline>
      <TouchableOpacity>
        <FontAwesomeIcon size={20} icon={faPlus} />
      </TouchableOpacity>
    </View>
  );
};

export default PlaylistStackHeader;

const styles = StyleSheet.create({
  playlistStackHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playlistStackHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 6,
  },
});
