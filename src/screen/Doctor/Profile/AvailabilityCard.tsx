import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {showtimefromstring} from '../../../AppFunction';
import Color from '../../../asset/Color';
import {AvailabilityFE} from '../../Availability/useGetAvailability';

const AvailabilityCard = ({availability}: {availability: AvailabilityFE}) => {
  return (
    <View
      style={{
        backgroundColor: Color.secondary,
        borderRadius: 5,
        padding: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={{color: 'black'}}>{availability.clinic_name}</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Text style={{color: 'black'}}>
            {showtimefromstring(availability.from_time)}
          </Text>
          <Text style={{color: 'black'}}>
            {showtimefromstring(availability.to_time)}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'black'}}>Slots: {availability.no_of_slot}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}>{availability.week_day}</Text>
          <Text style={{color: 'black'}}>{availability.week}</Text>
        </View>
      </View>
    </View>
  );
};

export default AvailabilityCard;
