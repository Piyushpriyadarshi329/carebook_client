import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Color from '../asset/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {useAddDocumentMutation} from '../screen/Doctor/useDocumentQuery';
import {VisibleDocument} from '../types';

export default function Profilepicuploadmodel({
  modalVisible,
  setModalVisible,
  onSubmit,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  onSubmit: (p: VisibleDocument | undefined) => void;
}) {
  const {mutate: addDocument} = useAddDocumentMutation({
    onSuccess: data => {
      onSubmit(data);
    },
  });
  async function openfolder() {
    ImagePicker.openPicker({
      width: 600,
      height: 800,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      addDocument(image);
      setModalVisible(false);
    });
  }
  async function opencamera() {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      addDocument(image);
      setModalVisible(false);
    });
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            height: 100,
            backgroundColor: Color.tertiary,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <View style={{marginTop: 10, flexDirection: 'row', flex: 1}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  opencamera();
                }}>
                <Entypo name="camera" size={40} color={Color.primary} />
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  openfolder();
                }}>
                <Entypo name="folder" size={40} color={Color.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
