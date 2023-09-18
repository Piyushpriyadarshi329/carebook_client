import {Icon, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import Color from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import MenuOptionsComponent from '../../../components/MenuOptionsComponent';

const AboutMenuOptions = ({
  onLogout,
  setEditMode,
  setEditMode2,
  edit1Title,
  edit2Title,
}: {
  setEditMode: () => void;
  setEditMode2?: () => void;
  edit1Title?: string;
  edit2Title?: string;
  onLogout?: () => void;
}) => {
  const options = [
    {
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]} key="edit">
          <Icon type={'material'} name="edit" size={17} color={Color.primary} />
          <Text>{edit1Title ?? 'Edit'}</Text>
        </View>
      ),
      onPress: setEditMode,
    },
  ];
  if (setEditMode2) {
    options.push({
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]} key="edit2">
          <Icon type={'material'} name="edit" size={17} color={Color.primary} />
          <Text>{edit2Title ?? 'Edit 2'}</Text>
        </View>
      ),
      onPress: setEditMode2,
    });
  }
  if (onLogout) {
    options.push({
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]} key="logout">
          <Icon name="power" size={17} color={Color.red} type="feather" />
          <Text style={{color: Color.red}}>Logout</Text>
        </View>
      ),
      onPress: onLogout,
    });
  }
  return (
    <MenuOptionsComponent options={options}>
      <Icon type={'material'} name="menu" size={26} />
    </MenuOptionsComponent>
  );
};

export default AboutMenuOptions;
