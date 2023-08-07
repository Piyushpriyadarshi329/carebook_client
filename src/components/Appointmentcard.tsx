import {View, Text, Image} from 'react-native';
import React from 'react';
import Color from '../asset/Color';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/Store';

export default function Appointmentcard({data}: {data: any}) {
  console.log('data', data);

  const Appdata = useSelector((state: RootState) => state);

  return (
    <View
      style={{
        backgroundColor: Color.primary,
        height: 170,
        width: 120,
        marginTop: 10,
        borderRadius: 5,
      }}>
      <View>
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
      <Text style={{color: 'black', marginLeft: 10, marginTop: 10}}>
        {new Date(Number(data.appointment_date)).toISOString().substring(0, 10)}
      </Text>
      <Text
        style={{color: 'black', marginLeft: 10, marginTop: 3, fontSize: 12}}>
        slot-{data.slot_index + 1}
      </Text>
    </View>
  );
}
