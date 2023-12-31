import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../asset/styles';

const DoctorProfileEntry = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={commonStyles.font16}>{label}:</Text>
      <Text style={commonStyles.font18}>{value ?? '- -'}</Text>
    </View>
  );
};

export default DoctorProfileEntry;
