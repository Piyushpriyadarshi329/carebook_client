import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuOptionsComponent from '../../../components/MenuOptionsComponent';
import {commonStyles} from '../../../asset/styles';
import Color from '../../../asset/Color';

const AboutMenuOptions = ({
  onLogout,
  setEditMode,
}: {
  setEditMode: () => void;
  onLogout?: () => void;
}) => {
  const options = [
    {
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]}>
          <Icon name="edit" size={17} color={Color.primary} />
          <Text style={commonStyles.font18}>Edit</Text>
        </View>
      ),
      onPress: setEditMode,
    },
  ];
  if (onLogout) {
    options.push({
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]}>
          <Icon name="power" size={17} color={Color.red} />
          <Text style={{color: Color.red, fontSize: 18}}>Logout</Text>
        </View>
      ),
      onPress: onLogout,
    });
  }
  return (
    <MenuOptionsComponent options={options}>
      <Icon name="menu" size={26} />
    </MenuOptionsComponent>
  );
};

export default AboutMenuOptions;
