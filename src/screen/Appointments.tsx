import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../asset/Color';
import {daylist, monthlist} from './../Appconstant';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {usegetAppointments} from '../customhook/usegetAppointments';
import {useNavigation} from '@react-navigation/native';
export default function Appointments() {
  const Appdata = useSelector((state: RootState) => state);

  const navigation = useNavigation();

  const [selected, setselected] = useState('current');
  const [appointmentdata, setappointmentdata] = useState([{}]);
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

  useEffect(() => {
    getappointlist();
  }, [selecteddate]);

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

  async function getappointlist() {
    try {
      let payload = {
        doctorId: Appdata.Appdata.userid,
        appointment_date: selecteddate,
      };

      let getAppointmentsres: any = await usegetAppointments(payload);

      console.log('getAppointmentsres', getAppointmentsres);

      // setappointmentdata(getAppointmentsres.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 10,
          marginHorizontal: 20,
          // backgroundColor:"red"
        }}>
        <Icon name={'chevron-back-sharp'} color={Color.primary} size={24} />
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 10,
          }}>
          Appointments
        </Text>
      </View>

      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 5,
        }}>
        <ScrollView horizontal={true}>
          {upcomingDates.map(i => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setselecteddate(i.value);
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
                        20
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
                      {i.day}
                    </Text>
                  </View>
                  <View style={{marginTop: 3}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'black',
                        fontWeight: '600',
                      }}>
                      {i.date}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={{flex: 10, marginHorizontal: 30}}>
        <ScrollView>
          {appointmentdata.length == 0 ? (
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
              {appointmentdata.map(i => {
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
                        <Text>customer name</Text>
                        <Text>Slot -1</Text>

                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('Leave');
                          }}>
                          <Text> Mark unavailable</Text>
                        </TouchableOpacity>
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
