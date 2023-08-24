import React from 'react';
import {Text, View} from 'react-native';
import {showtimefromstring} from '../../../AppFunction';
import Color from '../../../asset/Color';
import {
  Availability,
  AvailabilityFE,
} from '../../Availability/useGetAvailability';

const AvailabilityCard = ({availability}: {availability: AvailabilityFE}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: Color.secondary,
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
        <Text style={{padding: 5, color: 'black'}}>{availability.week}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{padding: 5, color: 'black'}}>
          {showtimefromstring(availability.from_time)}
        </Text>
        <Text style={{padding: 5, color: 'black'}}>
          {showtimefromstring(availability.to_time)}
        </Text>
      </View>
    </View>
  );
};

export default AvailabilityCard;
