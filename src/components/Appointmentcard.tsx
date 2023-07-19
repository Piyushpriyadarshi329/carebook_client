import {View, Text, Image} from 'react-native';
import React from 'react';
import Color from '../asset/Color';

export default function Appointmentcard() {
  return (
    <View
      style={{
        backgroundColor: Color.primary,
        height: 150,
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
        Jessica Smith
      </Text>
      <Text
        style={{color: 'black', marginLeft: 10, marginTop: 3, fontSize: 12}}>
        7:00 am - 7:15 am
      </Text>
    </View>
  );
}
