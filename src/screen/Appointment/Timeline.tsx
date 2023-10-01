import LoadingDots from '@apolloeagle/loading-dots';
import {Text} from '@rneui/themed';
import _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import uuid from 'react-native-uuid';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';
import {Appointmentdto, BookingStatus} from '../../types';
import {getTimeStringFromDBTime} from '../../utils/dateMethods';
import {useAlert} from '../../utils/useShowAlert';
import Status from './Status';

const AppointmentTimeline = ({
  appointments,
  doctorId,
  appointmentDate,
  isForClinic,
}: {
  appointments: Appointmentdto[] | undefined;
  doctorId: string;
  appointmentDate: number;
  isForClinic: boolean;
}) => {
  const {successAlert} = useAlert();
  const {mutate: updateSlotStatus, isLoading} = useUpdateSlotStatus(() => {
    successAlert('Status updated Successfully');
  });
  const groupedAppointments = Object.values(
    _.groupBy(appointments, 'workingtime_id'),
  );
  function updateslot(bookingid: string, status: string) {
    updateSlotStatus({
      id: bookingid,
      status: status,
      doctorId,
      appointmentDate,
    });
  }
  const timelineData = groupedAppointments.reduce<
    {
      id: string;
      type: 'SLOT' | 'HEAD';
      title: string | undefined;
      description: string | undefined;
      icon: any;
      circleColor: string | undefined;
      lineColor: string | undefined;
      status?: BookingStatus;
    }[]
  >((reducedVal, appointments) => {
    const timelineData = appointments
      ?.sort((a, b) => a.slot_index - b.slot_index)
      .map((appointment, index) => {
        const isCurrentCompleted =
          appointment.status === BookingStatus.COMPLETED;
        const isNextCompleted =
          appointments[index + 1]?.status === BookingStatus.COMPLETED;
        console.log(appointment.clinic_name);
        return {
          id: appointment.id,
          type: 'SLOT',
          name: appointment.name,
          description: `Slot Number: ${appointment.slot_index}`,
          icon: isCurrentCompleted ? require('./tick.png') : undefined,
          circleColor: isCurrentCompleted ? 'white' : undefined,
          lineColor: isNextCompleted ? Color.success : undefined,
          status: appointment.status,
          clinic: appointment.clinic_name,
          gender: appointment.gender?.slice(0, 1),
          age: appointment.dob,
        };
      });

    const isFirstComplete = appointments[0]?.status === BookingStatus.COMPLETED;
    return [
      ...reducedVal,
      {
        id: uuid.v4().toString(),
        type: 'HEAD',
        name: getTimeStringFromDBTime(appointments[0].from_working_time),
        description: '',
        icon: require('./time.png'),
        circleColor: '',
        lineColor: isFirstComplete ? Color.success : undefined,
      },
      ...timelineData,
    ];
  }, []);

  return !appointments?.length ? (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Color.black,
            fontWeight: '600',
            fontSize: 20,
            marginTop: 40,
          }}>
          No Appointments for the date.
        </Text>
      </View>
    </>
  ) : (
    <Timeline
      data={timelineData}
      innerCircle={'icon'}
      renderDetail={(rowData, rowId) => {
        return rowData.type == 'SLOT' ? (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={[commonStyles.font16, commonStyles.weight400]}>
                {rowData.name}{' '}
                {!!rowData.age &&
                  `(${rowData.age} y${
                    !!rowData.gender ? `, ${rowData.gender} ` : ' '
                  })`}
              </Text>
              <Text style={commonStyles.caption}>{rowData.description}</Text>
              {!isForClinic && (
                <Text style={commonStyles.caption}>{rowData.clinic}</Text>
              )}
            </View>
            <View style={{paddingRight: 20}}>
              {isLoading ? (
                <LoadingDots
                  animation="pulse"
                  dots={3}
                  color={Color.primary}
                  size={5}
                />
              ) : (
                <Status
                  id={rowData.id}
                  status={rowData.status}
                  updateslot={updateslot}
                />
              )}
            </View>
          </View>
        ) : (
          <View>
            <Text style={commonStyles.font20}>{rowData.name}</Text>
          </View>
        );
      }}
    />
  );
};

export default AppointmentTimeline;
