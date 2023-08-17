import React from 'react';
import {Image, Text, View} from 'react-native';
import Color from '../asset/Color';

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
          marginBottom: 10,
        }}>
        {new Date(Number(data.appointment_date)).toLocaleDateString('en-In')}
      </Text>
    </View>
  );
}
