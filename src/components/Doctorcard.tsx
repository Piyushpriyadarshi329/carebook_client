import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {AppPages} from '../appPages';
import {DoctorDto} from '../types';

export default function Doctorcard({doctor}: {doctor: DoctorDto}) {
  console.log('doctor', doctor);
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  const navigateToAppointments = () =>
    navigation.navigate(AppPages.Appointments, {
      id: doctor.id,
      clinic_id: userId,
    });
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Color.tertiary,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
      }}>
      <TouchableOpacity
        onPress={navigateToAppointments}
        style={{
          flexDirection: 'row',
          flex: 3,
        }}>
        <View style={{flex: 1}}>
          <Image
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              marginVertical: 10,
              marginLeft: 10,
            }}
            source={
              doctor.profile_image
                ? {uri: doctor.profile_image}
                : require('./../asset/image/profile.png')
            }
          />
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text style={{color: 'black', fontWeight: '600', fontSize: 20}}>
            {doctor.name}
          </Text>
          <Text style={{color: 'black'}}>{doctor.mobile}</Text>
          {doctor.email && <Text style={{color: 'black'}}>{doctor.email}</Text>}
          {doctor.speciality && (
            <Text style={{color: 'black'}}>{doctor.speciality}</Text>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DoctorProfile', {
              id: doctor.id,
              clinic_id: userId,
            });
          }}>
          <Icon name="user" style={{color: Color.primary, fontSize: 24}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
