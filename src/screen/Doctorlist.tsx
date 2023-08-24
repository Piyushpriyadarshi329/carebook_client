import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import Doctorcard from '../components/Doctorcard';
import type {RootState} from '../redux/Store';
import {useGetDoctorsList} from './useDoctorQuery';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DoctorDto} from '../types';
import {useremoveDoctorMapping} from '../customhook/useremoveDoctorMapping';
import SwipeDeleteButton from '../components/SwipeDeleteButton';
import ConformationModel from '../components/ConformationModel';

export default function Doctorlist() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteddoctor, setdeleteddoctor] = useState<DoctorDto | null>();

  const navigation = useNavigation<any>();
  const userId = useSelector((state: RootState) => state.Appdata.userid);

  const {mutate: removeDoctor} = useremoveDoctorMapping(() => {});
  const {data: doctorlist} = useGetDoctorsList({
    clinic_id: userId ?? '',
  });

  async function onclick(doctor: DoctorDto) {
    setdeleteddoctor(doctor);
    setModalVisible(true);
  }

  async function deletehandler(doctor: DoctorDto) {
    try {
      let payload = {
        doctor_id: deleteddoctor?.id,
        clinic_id: deleteddoctor?.clinic_id,
      };

      console.log('payload', payload);

      let res = await removeDoctor(payload);
      setModalVisible(false);
    } catch (error) {
      setModalVisible(false);

      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ConformationModel
        title="Doctor Delete?"
        subtitle="Do you want to delete Doctor?"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onsubmit={deletehandler}
      />
      <View style={{flex: 10}}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginRight: 20,
            margin: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Adddoctor');
            }}>
            <Icon name="add-circle" color={Color.primary} size={30} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 20}}>
          {doctorlist?.length == 0 ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black'}}>No Doctor FOund</Text>
            </View>
          ) : (
            <SwipeListView
              data={doctorlist}
              renderItem={(data, rowMap) => <Doctorcard doctor={data.item} />}
              renderHiddenItem={(data, rowMap) => (
                <SwipeDeleteButton onPress={onclick} item={data.item} />
              )}
              rightOpenValue={-75}
            />
          )}
        </View>
      </View>
    </View>
  );
}
