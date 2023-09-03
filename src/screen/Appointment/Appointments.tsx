import {default as React, useMemo, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {daylist, monthlist} from '../../Appconstant';
import Color, {Pallet2} from '../../asset/Color';
import {UpcomingDateTile} from '../../components/DateTile';
import Navbar from '../../components/Navbar';
import {RootState} from '../../redux/Store';
import {getToday} from '../../utils/dateMethods';
import {useGetDoctor} from '../useDoctorQuery';
import AppointmentTimeline from './Timeline';
import {useGetAppointments} from './useAppointmentsQuery';
import CalendarModal from '../../components/CalendarModal';
import {BookingStatus} from '../../types';

export const LoggedInUserAppointments = () => {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  return <Appointments doctorId={userId} />;
};
export const AppointmentForDoctor = (props: any) => {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  return (
    <Appointments
      doctorId={props.route.params.id}
      view={'CLINIC'}
      clinic_id={userId}
    />
  );
};

function Appointments({
  doctorId,
  view = 'DOCTOR',
  clinic_id,
}: {
  doctorId: string;
  view?: 'CLINIC' | 'DOCTOR';
  clinic_id?: string;
}) {
  const [centerdate, setcenterdate] = useState<Date>(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selecteddate, setselecteddate] = useState(getToday().getTime());
  const {data: doctorDetails} = useGetDoctor({id: doctorId, clinic_id});
  const upcomingDates = useMemo(() => {
    let localdate = [];

    for (let i = -2; i < 7; i++) {
      let date = new Date(centerdate);

      date.setDate(date.getDate() + i);

      let month = date.getMonth();

      let d1 = date.getDate();

      let Appointment_date = new Date(
        `${
          date.getFullYear() +
          '-' +
          ('0' + (date.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + date.getDate()).slice(-2)
        }T00:00:00Z`,
      ).getTime();

      localdate.push({
        date: d1 + ' ' + monthlist[month],
        day: daylist[date.getDay()],
        value: Appointment_date,
      });
    }

    return localdate;
  }, [centerdate]);
  console.log(clinic_id);
  const {data: appointments, isLoading} = useGetAppointments({
    doctorId: doctorId,
    appointment_date: selecteddate,
    clinicId: clinic_id,
    status: [BookingStatus.BOOKED],
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar
        title={
          view === 'CLINIC'
            ? `Dr. ${doctorDetails?.name ?? ''}`
            : 'Appointments'
        }
      />
      <CalendarModal
        date={centerdate}
        setDate={date => {
          setcenterdate(date);
          setselecteddate(new Date(date).getTime());
        }}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.datesContainer}>
        <ScrollView horizontal={true}>
          {upcomingDates.map(date => {
            return (
              <UpcomingDateTile
                key={`appointments_date_tile_${date.value}`}
                {...{date, setselecteddate}}
                isSelected={date.value === selecteddate}
                doctorId={doctorId}
                clinicId={clinic_id}
              />
            );
          })}
        </ScrollView>

        <View style={{marginTop: 10, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Icon name={'calendar'} color={Color.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 20, flex: 1}}>
        <AppointmentTimeline
          appointments={appointments}
          doctorId={doctorId}
          appointmentDate={selecteddate}
          isForClinic={!!clinic_id}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  datesContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 5,
  },
});
