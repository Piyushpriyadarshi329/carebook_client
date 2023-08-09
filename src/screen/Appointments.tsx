import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../asset/Color';
import {daylist, monthlist} from './../Appconstant';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {usegetAppointments} from '../customhook/usegetAppointments';
import {useNavigation} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import {useUpdateSlotStatus} from '../customhook/useUpdateSlotStatus';

export const UpcomingDateTile = (props: {date: any; setselecteddate: any}) => {
  const Appdata = useSelector((state: RootState) => state);
  const {data: appointmentdata} = usegetAppointments({
    doctorId: Appdata.Appdata.userid,
    appointment_date: props.date.value,
  });
  return (
    <TouchableOpacity
      onPress={() => {
        props.setselecteddate(props.date.value);
      }}>
      <View
        style={{
          backgroundColor: Color.primary,
          width: 60,
          height: 100,
          marginHorizontal: 5,
          borderRadius: 3,
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              width: 20,
              height: 20,
              margin: 5,
              borderRadius: 20,
              backgroundColor: Color.secondary,
            }}>
            <Text style={{textAlign: 'center', color: 'black'}}>
              {appointmentdata?.length}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: '600',
            }}>
            {props.date.day}
          </Text>
        </View>
        <View style={{marginTop: 3}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontWeight: '600',
            }}>
            {props.date.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Appointments() {
  const Appdata = useSelector((state: RootState) => state);

  const navigation = useNavigation();

  const {mutate: UpdateSlotStatus} = useUpdateSlotStatus(() => {
    alert('Status updated Successfully');

    // navigation.goBack();
  });

  const [selected, setselected] = useState('current');
  const [start, setstart] = useState(false);
  const [completed, setcompleted] = useState(false);
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

    for (let i = 0; i < 6; i++) {
      let date = new Date();

      date.setDate(date.getDate() + i);

      let month = date.getMonth();

      let d1 = date.getDate();

      let obj: any = {};

      // obj.dat

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
  }, []);
  const {data: appointmentdata} = usegetAppointments({
    doctorId: Appdata.Appdata.userid,
    appointment_date: selecteddate,
  });
  console.log('appointmentdata: ', appointmentdata);

  async function updateslot(bookingid: string, status: string) {
    try {
      //updateslot api call  status
      UpdateSlotStatus({
        id: bookingid,
        status: status,
      });
    } catch (error) {
      console.log('error');
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 5,
        }}>
        <ScrollView horizontal={true}>
          {upcomingDates.map(date => {
            return <UpcomingDateTile {...{date, setselecteddate}} />;
          })}
        </ScrollView>
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

                          {/* <View style={{flexDirection: 'row'}}>
                            <View>
                              <CheckBox
                                style={{flex: 1, padding: 10}}
                                checkBoxColor={Color.primary}
                                onClick={() => {
                                  if (appointment.status == 'BOOKED') {
                                    setstart(true);

                                    updateslot(appointment.id, 'START');
                                  }
                                }}
                                isChecked={
                                  appointment.status == 'COMPLETED' ||
                                  appointment.status == 'START' ||
                                  start
                                }
                                leftText={''}
                              />
                            </View>
                            <View style={{marginTop: 15, marginLeft: 10}}>
                              <Text style={{color: 'black'}}>Start</Text>
                            </View>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <View>
                              <CheckBox
                                style={{flex: 1, padding: 10}}
                                checkBoxColor={Color.primary}
                                onClick={() => {
                                  if (appointment.status == 'START' || start) {
                                    setcompleted(true);

                                    updateslot(appointment.id, 'COMPLETED');
                                  }
                                }}
                                isChecked={
                                  appointment.status == 'COMPLETED' || completed
                                }
                                leftText={''}
                              />
                            </View>
                            <View style={{marginTop: 15, marginLeft: 10}}>
                              <Text style={{color: 'black'}}>Completed</Text>
                            </View>
                          </View> */}
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
