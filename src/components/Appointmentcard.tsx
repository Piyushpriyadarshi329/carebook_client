import {Text} from '@rneui/themed';
import moment from 'moment';
import React from 'react';
import {Image, View} from 'react-native';
import {showtimefromstring} from '../AppFunction';
import Color from '../asset/Color';
import {Appointmentdto} from '../types';

export default function Appointmentcard({
  appointment,
}: {
  appointment: Appointmentdto;
}) {
  return (
    <View
      style={{
        backgroundColor: Color.secondary,
        borderRadius: 5,
        padding: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 50,
            marginTop: 10,
            marginLeft: 10,
          }}
          source={require('./../asset/image/profile.png')}
        />
      </View>

      <Text style={{color: 'black', marginTop: 10}}>
        {appointment.customerName}
      </Text>
      <Text
        style={{
          color: 'black',
          marginTop: 5,
        }}>
        {moment(Number(appointment.appointment_date)).format('ll')}
      </Text>
      <Text
        style={{
          color: 'black',
        }}>
        Slot: {appointment.slot_index}
      </Text>
      <Text
        style={{
          color: 'black',
        }}>
        Slot time: {showtimefromstring(appointment.from_working_time ?? '')}
      </Text>
    </View>
  );
}
