import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {AppPages} from '../../../Routes/appPages';
import Color from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import {RootState} from '../../../redux/Store';
import {DoctorDto} from '../../../types';

export default function Doctorcard({doctor}: {doctor: DoctorDto}) {
  const navigation = useNavigation<any>();
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
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 15,
        paddingVertical: 10,
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
                : require('../../../asset/image/doctor.png')
            }
          />
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          {doctor.speciality && (
            <Text style={commonStyles.caption}>{doctor.speciality}</Text>
          )}
          <Text style={[commonStyles.font20, commonStyles.weight600]}>
            Dr. {doctor.name}
          </Text>
          <Text style={{color: 'black'}}>{doctor.mobile}</Text>
          {doctor.email && <Text style={{color: 'black'}}>{doctor.email}</Text>}
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
