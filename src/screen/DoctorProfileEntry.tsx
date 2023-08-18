import React from 'react';
import {Text, View} from 'react-native';

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
      }}>
      <Text style={{color: 'black'}}>{label}:</Text>
      <Text style={{color: 'black', marginLeft: 10}}>{value ?? '- -'}</Text>
    </View>
  );
};

export default DoctorProfileEntry;
