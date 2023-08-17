import {default as React, useMemo, useState} from 'react';
import {
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import {UpcomingDateTile} from '../components/DateTile';
import Navbar from '../components/Navbar';
import {useUpdateSlotStatus} from '../customhook/useUpdateSlotStatus';
import {usegetAppointments} from '../customhook/usegetAppointments';
import {RootState} from '../redux/Store';
import {useAlert} from '../utils/useShowAlert';
import {daylist, monthlist} from './../Appconstant';

export const LoggedInUserAppointments = () => {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  return <Appointments doctorId={userId} />;
};
export const AppointmentForDoctor = (props: any) => {
  return <Appointments doctorId={props.route.params.id} />;
};

function Appointments({doctorId}: {doctorId: string}) {
  const {successAlert} = useAlert();
  const [centerdate, setcenterdate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const {mutate: UpdateSlotStatus} = useUpdateSlotStatus(() => {
    successAlert('Status updated Successfully');
  });

  const [selecteddate, setselecteddate] = useState(
    new Date(
      `${
        new Date().getFullYear() +
        '-' +
        ('0' + (new Date().getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + new Date().getDate()).slice(-2)
      }T00:00:00Z`,
    ).getTime(),
  );

  const upcomingDates = useMemo(() => {
    let localdate = [];

    for (let i = -2; i < 3; i++) {
      let date = new Date(centerdate);

      date.setDate(date.getDate() + i);

      let month = date.getMonth();

      let d1 = date.getDate();

      let obj: any = {};

      let Appointment_date = new Date(
        `${
          date.getFullYear() +
          '-' +
          ('0' + (date.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + date.getDate()).slice(-2)
        }T00:00:00Z`,
      ).getTime();

      obj.date = d1 + ' ' + monthlist[month];
      obj.day = daylist[date.getDay()];
      obj.value = Appointment_date;

      localdate.push(obj);
    }

    return localdate;
  }, [centerdate]);
  const {data: appointmentdata} = usegetAppointments({
    doctorId: doctorId,
    appointment_date: selecteddate,
  });

  function updateslot(bookingid: string, status: string) {
    UpdateSlotStatus({
      id: bookingid,
      status: status,
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar title="Appointments" />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View>
            <Calendar
              onDayPress={day => {
                setcenterdate(day.dateString);
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: Color.primary,
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
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

          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              style={{backgroundColor: Color.primary, borderRadius: 5}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={{fontSize: 16, color: 'black', padding: 10}}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
        }}>
        <View style={{flex: 6}}>
          <ScrollView horizontal={true}>
            {upcomingDates.map(date => {
              return <UpcomingDateTile {...{date, setselecteddate}} />;
            })}
          </ScrollView>
        </View>
        <View style={{flex: 1, marginTop: 10, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <Icon name={'calendar'} color={Color.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 10, marginHorizontal: 30}}>
        <ScrollView>
          {appointmentdata?.length == 0 ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Color.black}}>No Appointment found.</Text>
              </View>
            </>
          ) : (
            <>
              {appointmentdata?.map(appointment => {
                return (
                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      marginTop: 10,
                    }}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <View>
                        <Text>________ AM</Text>
                      </View>
                      <View
                        style={{
                          height: 0.2,
                          borderWidth: 0.4,
                          flex: 1,
                          marginTop: 5,
                          marginHorizontal: 20,
                        }}></View>
                      <View>
                        <Text>...</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: Color.secondary,
                        borderRadius: 5,
                        marginTop: 5,
                      }}>
                      <View style={{flex: 1}}>
                        <Image
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 50,
                            marginTop: 5,
                            marginLeft: 10,
                          }}
                          source={require('./../asset/image/profile.png')}
                        />
                      </View>

                      <View style={{flex: 2}}>
                        <Text style={{color: 'black'}}>customer name</Text>
                        <Text style={{color: 'black'}}>
                          Slot {appointment.slot_index}
                        </Text>

                        <View
                          style={{
                            paddingTop: 10,
                            marginHorizontal: 10,
                            flexDirection: 'row',
                          }}>
                          {appointment.status == 'BOOKED' ? (
                            <>
                              <Button
                                color={Color.primary}
                                title="Start"
                                onPress={() => {
                                  updateslot(appointment.id, 'STARTED');
                                }}></Button>
                            </>
                          ) : null}

                          {appointment.status == 'STARTED' ? (
                            <>
                              <Button
                                color={Color.primary}
                                title="Complete"
                                onPress={() => {
                                  updateslot(appointment.id, 'COMPLETED');
                                }}></Button>
                            </>
                          ) : null}

                          {appointment.status == 'COMPLETED' ? (
                            <>
                              <View>
                                <Text style={{color: 'green'}}>Completed</Text>
                              </View>
                            </>
                          ) : null}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
