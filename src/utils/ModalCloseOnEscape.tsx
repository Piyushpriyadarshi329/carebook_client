import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

const ModalCloseOnEscape = ({
  setVisible,
}: {
  setVisible: (p: boolean) => void;
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <View style={styles.modalOverlay} />
    </TouchableWithoutFeedback>
  );
};

export default ModalCloseOnEscape;

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
