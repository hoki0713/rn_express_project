import React from 'react';
import { View, Modal, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Color from '../constants/colors';

const CustomModal = props => {
  return (
    <Modal
      animationType={props.animation}
      transparent={props.transparentContainer}
      visible={props.visible}
      presentationStyle={props.mode}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.mainContainer}>
          <View style={{...styles.modalWrapper, ...props.style}}>
            <View style={styles.modalContainer}>
              {props.children}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  modalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 300,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Color.grey,
    borderStyle: 'solid',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});

export default CustomModal;