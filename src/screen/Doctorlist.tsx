import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import Doctorcard from '../components/Doctorcard';
import type {RootState} from '../redux/Store';
import {useGetDoctorsList} from './useDoctorQuery';

export default function Doctorlist() {
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.Appdata.userid);

  const {data: doctorlist} = useGetDoctorsList({
    clinic_id: userId ?? '',
  });

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
            <ScrollView>
              {doctorlist?.map(doctor => {
                return <Doctorcard doctor={doctor} />;
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
