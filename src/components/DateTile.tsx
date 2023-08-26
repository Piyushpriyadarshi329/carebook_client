import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import {useGetAppointments} from '../screen/Appointment/useAppointmentsQuery';
import {RootState} from '../redux/Store';

export const UpcomingDateTile = (props: {
  date: any;
  setselecteddate: any;
  isSelected: boolean;
  doctorId: string;
}) => {
  const {data: appointmentdata} = useGetAppointments({
    doctorId: props.doctorId,
    appointment_date: props.date.value,
  });
  return (
    <TouchableOpacity
      onPress={() => {
        props.setselecteddate(props.date.value);
      }}>
      <View
        style={{
          backgroundColor: props.isSelected ? Color.secondary : Color.greybgc,
          width: 60,
          height: 100,
          marginHorizontal: 5,
          borderRadius: 3,
        }}>
        <View style={{alignItems: 'flex-end', marginRight: 10, marginTop: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: '400',
              fontSize: 19,
            }}>
            {appointmentdata?.length || '-'}
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: '600',
            }}>
            {props.date.day}
          </Text>
        </View>
        <View style={{marginTop: 3}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: '600',
            }}>
            {props.date.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
