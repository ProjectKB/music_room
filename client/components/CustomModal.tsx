import React from 'react';
import {StyleSheet, Modal, TouchableOpacity, View} from 'react-native';

type CustomModalProps = {
  secu: any;
  modalVisibility: undefined | boolean;
  Component: () => JSX.Element;

  setModalVisibility: (arg0: boolean) => void;
};

const CustomModal = (props: CustomModalProps) => {
  if (props.secu !== undefined) {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={props.modalVisibility}
        onRequestClose={() => {
          props.setModalVisibility(false);
        }}>
        <View style={[styles.fullScreen, styles.dismissContainer]} />
        <TouchableOpacity
          style={[styles.fullScreen]}
          onPress={() => props.setModalVisibility(false)}
        />
        <props.Component />
      </Modal>
    );
  } else {
    return null;
  }
};

export default CustomModal;

const styles = StyleSheet.create({
  dismissContainer: {
    backgroundColor: '#292b2a',
    opacity: 0.5,
  },
  fullScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
