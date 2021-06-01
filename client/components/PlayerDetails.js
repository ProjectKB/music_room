import React, {useContext} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {Headline} from 'react-native-paper';

const PlayerDetails = props => {
  const modalVisible = props.modalVisible;
  const setModalVisible = props.setModalVisible;

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.playlistStackHeaderContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <FontAwesomeIcon size={20} icon={faChevronDown} />
          </TouchableOpacity>
          <Headline style={styles.playlistStackHeaderTitle}>
            {props.songName}
          </Headline>
        </View>
      </Modal>
    </View>
  );
};

export default PlayerDetails;

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
