import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import {usegetAppointments} from '../customhook/usegetAppointments';
import {RootState} from '../redux/Store';

export const UpcomingDateTile = (props: {
  date: any;
  setselecteddate: any;
  isSelected: boolean;
}) => {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  const {data: appointmentdata} = usegetAppointments({
    doctorId: userId,
    appointment_date: props.date.value,
  });

  return (
    <TouchableOpacity
      onPress={() => {
        props.setselecteddate(props.date.value);
      }}>
      <View
        style={{
          backgroundColor: props.isSelected ? Color.primary : Color.secondary,
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
