import {useNavigation} from '@react-navigation/native';
import React from 'react';
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

export default function Doctorlist() {
  const navigation = useNavigation<any>();
  const userId = useSelector((state: RootState) => state.Appdata.userid);

  const {mutate: removeDoctor} = useremoveDoctorMapping(() => {});
  const {data: doctorlist} = useGetDoctorsList({
    clinic_id: userId ?? '',
  });

  async function deletehandler(doctor: DoctorDto) {
    try {
      let payload = {
        doctor_id: doctor.id,
        clinic_id: doctor.clinic_id,
      };

      let res = await removeDoctor(payload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
                <SwipeDeleteButton onPress={deletehandler} item={data.item} />
              )}
              rightOpenValue={-75}
            />
          )}
        </View>
      </View>
    </View>
  );
}
