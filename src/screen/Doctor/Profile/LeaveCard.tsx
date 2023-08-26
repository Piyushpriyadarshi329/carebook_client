import React from 'react';
import {Text, View} from 'react-native';
import Color from '../../../asset/Color';
import {LeaveDto} from '../../../types';

const LeaveCard = ({details: i}: {details: LeaveDto}) => {
  return (
    <View
      style={{
        backgroundColor: Color.secondary,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={{padding: 5, color: 'black'}}>
            From date:{' '}
            {new Date(Number(i.fromdate)).toISOString().substring(0, 10)}
          </Text>
          <Text style={{padding: 5, color: 'black'}}>
            To date: {new Date(Number(i.todate)).toISOString().substring(0, 10)}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{padding: 5, color: 'black'}}>
            {i.fullday ? 'Full day' : null}
          </Text>
        </View>
      </View>
      <Text style={{padding: 5, color: 'black'}}>Reason: {i.reason}</Text>
    </View>
  );
};

export default LeaveCard;
