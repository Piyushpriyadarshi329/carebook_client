import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {showtimefromstring} from '../../../AppFunction';
import Color from '../../../asset/Color';
import {AvailabilityFE} from '../../Availability/useGetAvailability';

const AvailabilityCard = ({
  availability,
  hideDays,
}: {
  availability: AvailabilityFE;
  hideDays?: boolean;
}) => {
  return (
    <View
      style={{
        backgroundColor: Color.secondary,
        borderRadius: 5,
        padding: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text>{availability.clinic_name}</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Text>{showtimefromstring(availability.from_time)}</Text>
          <Text>{showtimefromstring(availability.to_time)}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>Slots: {availability.no_of_slot}</Text>
        </View>
      </View>
      {!hideDays && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flex: 1}}>
            <Text>{availability.week_day}</Text>
            <Text>{availability.week}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default AvailabilityCard;
