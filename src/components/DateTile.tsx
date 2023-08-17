import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import {usegetAppointments} from '../customhook/usegetAppointments';
import {RootState} from '../redux/Store';

export const UpcomingDateTile = (props: {date: any; setselecteddate: any}) => {
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
          backgroundColor: Color.primary,
          width: 60,
          height: 100,
          marginHorizontal: 5,
          borderRadius: 3,
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              width: 20,
              height: 20,
              margin: 5,
              borderRadius: 20,
              backgroundColor: Color.secondary,
            }}>
            <Text style={{textAlign: 'center', color: 'black'}}>
              {appointmentdata?.length}
            </Text>
          </View>
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
