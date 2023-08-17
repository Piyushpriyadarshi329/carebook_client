import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';

const EditButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
        borderColor: Color.secondary,
        borderWidth: 1,
      }}
      onPress={onPress}>
      <Icon name="edit" size={17} color={Color.primary} />
    </TouchableOpacity>
  );
};

export default EditButton;
