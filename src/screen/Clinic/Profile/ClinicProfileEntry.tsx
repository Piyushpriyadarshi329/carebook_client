import React from 'react';
import {Text, View} from 'react-native';
import {commonStyles} from '../../../asset/styles';

const ClinicProfileEntry = ({
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
      <Text style={commonStyles.caption}>{label}:</Text>
      <Text style={commonStyles.font18}>{value ?? '- -'}</Text>
    </View>
  );
};

export default ClinicProfileEntry;
