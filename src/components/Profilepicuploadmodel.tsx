import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Color from '../asset/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {useAddDocumentMutation} from '../screen/Doctor/useDocumentQuery';

export default function Profilepicuploadmodel({
  modalVisible,
  setModalVisible,
  onSubmit,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  onSubmit: (p: any) => void;
}) {
  const {mutate: addDocument} = useAddDocumentMutation({
    onSuccess: data => {
      console.log(data.id, data.presignedUrl);
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
      addDocument((image as any).data);
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
      addDocument((image as any).data);
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
