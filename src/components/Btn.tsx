import {Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Color from '../asset/Color';

const Btn = (props: {title: string; onPress: () => void; color?: string}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 50,
          backgroundColor: props.color || Color.primary,
        }}>
        <Text style={{fontWeight: '600', color: 'black', textAlign: 'center'}}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Btn;
