import {View, Text, Modal, Button} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';

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
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgray',
          marginVertical: 250,
          marginHorizontal: 70,
          borderRadius: 20,
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, marginTop: 20, marginLeft: 20}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1}}>
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

        <View style={{flex: 1, flexDirection: 'row', marginTop: -40}}>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Button
              title="Back"
              color={Color.primary}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}></Button>
          </View>
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Button
              title="OK"
              color={Color.primary}
              onPress={() => {
                onsubmit();
              }}></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
