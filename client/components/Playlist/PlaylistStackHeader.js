import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Headline} from 'react-native-paper';

const PlaylistStackHeader = props => (
  <View style={styles.playlistStackHeaderContainer}>
    <Headline style={styles.playlistStackHeaderTitle}>
      {props.navigation.children}
    </Headline>
    {props.displayAddButton ? (
      <TouchableOpacity onPress={props.addAction}>
        <FontAwesomeIcon style={{color: 'white'}} size={20} icon={faPlus} />
      </TouchableOpacity>
    ) : null}
  </View>
);

export default PlaylistStackHeader;

const styles = StyleSheet.create({
  playlistStackHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playlistStackHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    flex: 6,
    color: 'white',
  },
});
