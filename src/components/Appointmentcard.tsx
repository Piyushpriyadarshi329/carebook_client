import {Text} from '@rneui/themed';
import React from 'react';
import {Image, View} from 'react-native';
import Color from '../asset/Color';
import moment from 'moment';
import {commonStyles} from '../asset/styles';

export default function Appointmentcard({data}: {data: any}) {
  return (
    <View
      style={{
        backgroundColor: Color.secondary,
        width: 120,
        marginTop: 10,
        borderRadius: 5,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            paddingHorizontal: 5,
            paddingVertical: 2,
          }}>
          {data.slot_index + 1}
        </Text>
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

      <Text style={{color: 'black', marginLeft: 10, marginTop: 10}}>
        {data.customerName}
      </Text>
      <Text
        style={{
          color: 'black',
          marginLeft: 10,
          marginTop: 5,
        }}>
        {moment(Number(data.appointment_date)).format('ll')}
      </Text>
      <Text
        style={{
          color: 'black',
          marginLeft: 10,
        }}>
        Slot: {data.slot_index}
      </Text>
    </View>
  );
}
