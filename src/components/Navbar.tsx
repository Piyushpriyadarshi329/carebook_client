import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';

const Navbar = (props: {
  title: string;
  asFullScreenModal?: boolean;
  endAdornment?: JSX.Element;
  bgc?: string;
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        backgroundColor: props.bgc,
      }}>
      {!props.asFullScreenModal && (
        <View
          onTouchEnd={() => navigation.goBack()}
          style={{position: 'absolute', left: 20, top: 10}}>
          <Icon
            name="keyboard-arrow-left"
            size={24}
            style={{color: Color.primary}}
          />
        </View>
      )}
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '800',
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
      {props.asFullScreenModal && (
        <View
          style={{position: 'absolute', right: 20, top: 10}}
          onTouchEnd={() => navigation.goBack()}>
          <Icon name="close" size={24} style={{color: Color.primary}} />
        </View>
      )}
      {props.endAdornment}
    </View>
  );
};

export default Navbar;
