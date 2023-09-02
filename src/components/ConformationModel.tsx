import {Text} from '@rneui/themed';
import React from 'react';
import {Modal, View} from 'react-native';
import {Button} from '@rneui/themed';
import Color from '../asset/Color';
import ModalCloseOnEscape from '../utils/ModalCloseOnEscape';

export default function ConformationModel({
  title,
  subtitle,
  modalVisible,
  setModalVisible,
  onsubmit,
}: {
  title: string;
  subtitle: string;
  modalVisible: any;
  setModalVisible: any;
  onsubmit: any;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalCloseOnEscape setVisible={setModalVisible} />
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 250,
          padding: 30,
          marginHorizontal: 50,
          borderRadius: 20,
          borderColor: 'black',
          borderWidth: 1,
          gap: 20,
        }}>
        <View style={{}}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
            }}>
            {title}
          </Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
            }}>
            {subtitle}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 20,
          }}>
          <Button
            title="Cancel"
            color={Color.primary}
            buttonStyle={{paddingHorizontal: 20}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}></Button>
          <Button
            title="Yes"
            color={Color.red}
            buttonStyle={{paddingHorizontal: 40}}
            onPress={() => {
              onsubmit();
            }}></Button>
        </View>
      </View>
    </Modal>
  );
}
