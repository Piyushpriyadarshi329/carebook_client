import LoadingDots from '@apolloeagle/loading-dots';
import {Text} from '@rneui/themed';
import _ from 'lodash';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import uuid from 'react-native-uuid';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';
import {Appointmentdto, BookingStatus} from '../../types';
import {getTimeStringFromDBTime} from '../../utils/dateMethods';
import {useAlert} from '../../utils/useShowAlert';
import Status from './Status';
import DownArrow from 'react-native-vector-icons/MaterialIcons';
import TimeLineEntry from './TimeLineEntry';

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
  const [showDetails, setShowDetails] = useState<string>('');

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

  // 'a2ae828c-6645-4882-a63b-2773f17944a6'

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
          phone: appointment.phone,
          patient_address: appointment.patient_address,
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
      renderDetail={(rowData, rowId) => (
        <TimeLineEntry {...{isForClinic, rowData, updateslot}} />
      )}
    />
  );
};

export default AppointmentTimeline;
