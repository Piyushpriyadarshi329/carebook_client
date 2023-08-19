import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

export default function Splashscreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('./../asset/image/logo.jpeg')}
        style={{height: 300, width: 300, resizeMode: 'contain'}}></Image>
    </View>
  );
}
