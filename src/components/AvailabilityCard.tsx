import React from 'react';
import {Text, View} from 'react-native';
import Color from '../asset/Color';
import {Availability} from '../customhook/useGetavailability';

const AvailabilityCard = ({availability}: {availability: Availability}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: Color.primary,
        borderRadius: 5,
      }}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text style={{textAlign: 'left', padding: 5, color: 'black'}}>
          {availability.clinic_name}
        </Text>
        <Text style={{padding: 5, color: 'black'}}>
          Slots: {availability.no_of_slot}
        </Text>
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        <Text style={{padding: 5, color: 'black'}}>
          {availability.week_day}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{padding: 5, color: 'black'}}>
          {availability.from_time}
        </Text>
        <Text style={{padding: 5, color: 'black'}}>{availability.to_time}</Text>
      </View>
    </View>
  );
};

export default AvailabilityCard;
