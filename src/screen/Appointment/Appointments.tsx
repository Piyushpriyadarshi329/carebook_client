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
import {usegetAppointments} from './useAppointmentsQuery';

export const LoggedInUserAppointments = () => {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  return <Appointments doctorId={userId} />;
};
export const AppointmentForDoctor = (props: any) => {
  return <Appointments doctorId={props.route.params.id} view={'CLINIC'} />;
};

function Appointments({
  doctorId,
  view = 'DOCTOR',
}: {
  doctorId: string;
  view?: 'CLINIC' | 'DOCTOR';
}) {
  const [centerdate, setcenterdate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selecteddate, setselecteddate] = useState(getToday());
  const {data: doctorDetails} = useGetDoctor(doctorId);
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

  const {data: appointments, isLoading} = usegetAppointments({
    doctorId: doctorId,
    appointment_date: selecteddate,
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar
        title={
          view === 'CLINIC' ? `Dr. ${doctorDetails?.name}` : 'Appointments'
        }
      />
      <Modal
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        transparent={true}
        visible={modalVisible}>
        <View
          style={{
            marginTop: 200,
            marginHorizontal: 50,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Color.primary,
          }}>
          <Calendar
            onDayPress={day => {
              setcenterdate(day.dateString);
              setModalVisible(!modalVisible);
            }}
            style={{borderRadius: 15}}
            theme={{
              backgroundColor: Pallet2.tertiary,
              calendarBackground: Pallet2.tertiary,
              textSectionTitleColor: Pallet2.primary,
              selectedDayBackgroundColor: Pallet2.primary,
              selectedDayTextColor: '#ffffff',
              todayTextColor: Pallet2.primary,
              dayTextColor: Pallet2.primary,
            }}
            markedDates={{
              [centerdate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
          />
        </View>
      </Modal>

      <View style={styles.datesContainer}>
        <ScrollView horizontal={true}>
          {upcomingDates.map(date => {
            return (
              <UpcomingDateTile
                {...{date, setselecteddate}}
                isSelected={date.value === selecteddate}
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
