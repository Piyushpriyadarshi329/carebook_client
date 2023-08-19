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
import Color, {Pallet2} from '../../asset/Color';
import {UpcomingDateTile} from '../../components/DateTile';
import Navbar from '../../components/Navbar';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';
import {usegetAppointments} from '../../customhook/usegetAppointments';
import {RootState} from '../../redux/Store';
import {useAlert} from '../../utils/useShowAlert';
import {daylist, monthlist} from '../../Appconstant';
import IconButton from '../../components/IconButton';
import Status from './Status';
import _ from 'lodash';
import {getTimeStringFromDBTime, getToday} from '../../utils/dateMethods';

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

  const [selecteddate, setselecteddate] = useState(getToday());

  const upcomingDates = useMemo(() => {
    let localdate = [];

    for (let i = -2; i < 3; i++) {
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
  const {data: appointments} = usegetAppointments({
    doctorId: doctorId,
    appointment_date: selecteddate,
  });

  function updateslot(bookingid: string, status: string) {
    UpdateSlotStatus({
      id: bookingid,
      status: status,
    });
  }
  console.log(upcomingDates[0], selecteddate);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Navbar title="Appointments" />
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

      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          marginHorizontal: 10,
          marginTop: 5,
        }}>
        <View style={{flex: 6}}>
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
          {appointments?.length == 0 ? (
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
            <>
              {Object.values(_.groupBy(appointments, 'workingtime_id'))?.map(
                app => (
                  <View
                    style={{
                      backgroundColor: Color.tertiary,
                      padding: 5,
                      borderRadius: 10,
                      marginVertical: 2,
                    }}>
                    <View>
                      <Text style={{color: 'black'}}>
                        {getTimeStringFromDBTime(app[0].from_working_time)}
                        &nbsp; {`------------------>`}
                      </Text>
                    </View>
                    {app
                      ?.sort((a, b) => a.slot_index - b.slot_index)
                      ?.map(appointment => {
                        return (
                          <View
                            style={{
                              flexDirection: 'column',
                              flex: 1,
                              marginTop: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                backgroundColor: Color.secondary,
                                borderRadius: 5,
                                marginTop: 5,
                                paddingVertical: 5,
                              }}>
                              <View style={{flex: 1}}>
                                <Image
                                  style={{
                                    width: 75,
                                    height: 75,
                                    borderRadius: 50,
                                    marginLeft: 10,
                                  }}
                                  source={require('../../asset/image/profile.png')}
                                />
                              </View>

                              <View style={{flex: 2, paddingVertical: 18}}>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontWeight: '500',
                                    fontSize: 20,
                                  }}>
                                  {appointment.customerName}
                                </Text>
                                <Text style={{color: 'black'}}>
                                  Slot: &nbsp;
                                  <Text
                                    style={{fontWeight: '600', fontSize: 20}}>
                                    {appointment.slot_index}
                                  </Text>
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                }}>
                                <Status
                                  status={appointment.status}
                                  id={appointment.id}
                                  updateslot={updateslot}
                                />
                              </View>
                            </View>
                          </View>
                        );
                      })}
                  </View>
                ),
              )}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
