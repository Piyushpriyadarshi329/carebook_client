import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';

const IconButton = ({
  icon,
  onPress,
}: {
  icon: JSX.Element;
  onPress: () => void;
}) => {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
};

export default IconButton;
