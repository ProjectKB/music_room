import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Headline} from 'react-native-paper';
import PlaylistCreationModalContext from '../contexts/PlaylistCreationModalContext';

const PlaylistStackHeader = props => {
  const {modalVisibility, setModalVisibility} = useContext(
    PlaylistCreationModalContext,
  );

  return (
    <View style={styles.playlistStackHeaderContainer}>
      <Headline style={styles.playlistStackHeaderTitle}>
        {props.navigation.children}
      </Headline>
      <TouchableOpacity onPress={() => setModalVisibility(true)}>
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
