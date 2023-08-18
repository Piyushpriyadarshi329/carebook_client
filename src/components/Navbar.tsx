import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';

const Navbar = (props: {title: string}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
      }}>
      <View style={{marginRight: 20}} onTouchEnd={() => navigation.goBack()}>
        <Icon
          name="keyboard-arrow-left"
          size={24}
          style={{color: Color.primary}}
        />
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '800',
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default Navbar;
