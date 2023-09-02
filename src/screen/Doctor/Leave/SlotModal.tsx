import React from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../../asset/Color';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {showtime} from '../../../AppFunction';
import ModalCloseOnEscape from '../../../utils/ModalCloseOnEscape';
import {useGetAvailabilityQuery} from '../../Availability/useGetavailability';

const SlotModal = ({
  value,
  setValue,
  modalVisible,
  setModalVisible,
  doctorId,
}: {
  value: any;
  setValue: (p: any) => void;
  modalVisible: boolean;
  setModalVisible: any;
  doctorId: string;
}) => {
  const {data: availabilityList} = useGetAvailabilityQuery({
    doctor_id: doctorId,
  });
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <ModalCloseOnEscape setVisible={setModalVisible} />
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 100,
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'black',
          height: '60%',
        }}>
        <View
          style={{position: 'absolute', right: 20, top: 10}}
          onTouchEnd={() => setModalVisible(false)}>
          <Icon name="close" size={24} style={{color: Color.primary}} />
        </View>
        <ScrollView style={{marginTop: 20}}>
          {availabilityList?.map(availability => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setValue(availability);
                  setModalVisible(false);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    backgroundColor:
                      value?.id == availability.id
                        ? Color.secondary
                        : Color.primary,
                    borderRadius: 5,
                  }}>
                  <View style={{alignItems: 'flex-start'}}>
                    <Text
                      style={{
                        textAlign: 'left',
                        padding: 5,
                        color: 'black',
                      }}>
                      {availability.clinic_name}
                    </Text>
                    <Text style={{padding: 5, color: 'black'}}>
                      Slots: {availability.no_of_slot}
                    </Text>
                  </View>
                  <View style={{flex: 2, alignItems: 'center'}}>
                    <Text style={{padding: 5, color: 'black'}}>
                      {availability.week_day}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{padding: 5, color: 'black'}}>
                      {showtime(Number(availability?.from_time))}
                    </Text>
                    <Text style={{padding: 5, color: 'black'}}>
                      {showtime(Number(availability?.to_time))}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SlotModal;
