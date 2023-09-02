import React from 'react';
import {Image, StatusBar, View} from 'react-native';

export default function Splashscreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#01af70',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={'#01af70'} barStyle="dark-content" />
      <Image
        source={require('./../asset/image/Carebook_Business_logo.jpg')}
        style={{height: 300, width: 300, resizeMode: 'contain'}}></Image>
    </View>
  );
}
