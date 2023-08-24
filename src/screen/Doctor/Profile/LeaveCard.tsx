import React from 'react';
import {Text, View} from 'react-native';
import Color from '../../../asset/Color';
import {LeaveDto} from '../../../types';

const LeaveCard = ({details: i}: {details: LeaveDto}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: Color.secondary,
        borderRadius: 5,
      }}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={{padding: 5, color: 'black'}}>
          To date: {new Date(Number(i.todate)).toISOString().substring(0, 10)}
        </Text>
        <Text style={{padding: 5, color: 'black'}}>
          From date:{' '}
          {new Date(Number(i.fromdate)).toISOString().substring(0, 10)}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{padding: 5, color: 'black'}}>Reason: {i.reason}</Text>
        <Text style={{padding: 5, color: 'black'}}>
          {i.fullday ? 'fullday' : null}
        </Text>
      </View>
    </View>
  );
};

export default LeaveCard;
