import {Text} from '@rneui/themed';
import React from 'react';
import {Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {showtime} from '../../../AppFunction';
import Color from '../../../asset/Color';
import ModalCloseOnEscape from '../../../utils/ModalCloseOnEscape';
import {
  AvailabilityFE,
  useGetAvailabilityQuery,
} from '../../Availability/useGetAvailability';
import AvailabilityCard from '../Profile/AvailabilityCard';

const SlotModal = ({
  value,
  setValue,
  modalVisible,
  setModalVisible,
  doctorId,
  clinicId,
}: {
  value: any;
  setValue: (p: AvailabilityFE) => void;
  modalVisible: boolean;
  setModalVisible: any;
  doctorId: string;
  clinicId: string | undefined;
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
        <ScrollView
          style={{marginTop: 20, gap: 10}}
          contentContainerStyle={{gap: 10}}>
          {availabilityList?.map(availability => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setValue(availability);
                  setModalVisible(false);
                }}>
                <AvailabilityCard availability={availability} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SlotModal;
