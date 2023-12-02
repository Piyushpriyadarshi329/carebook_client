import {default as React, useMemo, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {Image} from '@rneui/themed';

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
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      let month = date.getMonth();
      let d1 = date.getDate();
      let Appointment_date = date.getTime();
      localdate.push({
        date: d1 + ' ' + monthlist[month],
        day: daylist[date.getDay()],
        value: Appointment_date,
      });
    }
    return localdate;
  }, [centerdate]);

  const {data: appointments, isLoading} = useGetAppointments({
    doctorId: doctorId,
    appointment_date: selecteddate,
    clinicId: clinic_id,
    status: [
      BookingStatus.BOOKED,
      BookingStatus.COMPLETED,
      BookingStatus.STARTED,
    ],
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
      {isLoading && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 40,
          }}>
          <Image
            source={require('../../asset/image/Carebook_loader.gif')}
            style={{width: 100, height: 100}}
          />
        </View>
      )}
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
