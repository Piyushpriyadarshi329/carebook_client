import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import Color from '../../../asset/Color';
import {LeaveDto} from '../../../types';
import moment from 'moment';
import {useGetAvailabilityQuery} from '../../Availability/useGetAvailability';
import AvailabilityCard from './AvailabilityCard';

const LeaveCard = ({details: i}: {details: LeaveDto}) => {
  const {data: availability} = useGetAvailabilityQuery({
    doctor_id: i.doctor_id,
    clinic_id: i.clinic_id,
  });
  const workingTime = availability?.find(a => a.id === i.worktime_id);
  return (
    <View
      style={{
        backgroundColor: Color.secondary,
        borderRadius: 5,
        padding: 5,
      }}>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Text>From date:</Text>
            <Text>{moment(Number(i.fromdate)).format('ll')}</Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Text>To date:</Text>
            <Text>{moment(Number(i.todate)).format('ll')}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {!!i.fullday && <Text>Full day</Text>}
        </View>
        {!i.fullday && workingTime && (
          <View
            style={{
              borderWidth: 1,
              borderColor: Color.primary,
              borderRadius: 5,
            }}>
            <AvailabilityCard availability={workingTime} hideDays />
          </View>
        )}
      </View>
      <Text>Reason: {i.reason}</Text>
    </View>
  );
};

export default LeaveCard;
