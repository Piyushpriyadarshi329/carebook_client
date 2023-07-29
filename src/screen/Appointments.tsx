import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../asset/Color';

export default function Appointments() {
  const [selected, setselected] = useState('current');

  useEffect(() => {
    getappointlist();
  }, []);

  async function getappointlist() {
    try {
      let payload = {
        customerId: Appstate.userid,
        doctorId: '',
        status: '',
      };

      let getAppointmentsres: any = await usegetAppointments(payload);

      console.log('getAppointmentsres', getAppointmentsres);
      setscheduled(getAppointmentsres.data.filter(i => i.status == 'BOOKED'));
      sethistory(getAppointmentsres.data.filter(i => i.status == 'COMPLETED'));
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

      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: Color.primary,
              width: '80%',
              borderRadius: 5,
              opacity: selected == 'current' ? 1 : 0.6,
            }}
            onPress={() => {
              setselected('current');
            }}>
            <Text
              style={{
                color: selected == 'current' ? 'white' : 'black',
                textAlign: 'center',
                fontSize: 16,
                padding: 5,
              }}>
              Current
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: Color.primary,
              width: '80%',
              borderRadius: 5,
              opacity: selected == 'history' ? 1 : 0.6,
            }}
            onPress={() => {
              setselected('history');
            }}>
            <Text
              style={{
                color: selected == 'history' ? 'white' : 'black',
                textAlign: 'center',
                fontSize: 16,
                padding: 5,
              }}>
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 5,
        }}>
        <ScrollView horizontal={true}>
          {[0, 1, 2, 3, 4, 5, 6].map(i => {
            return (
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
                    SUN
                  </Text>
                </View>
                <View style={{marginTop: 3}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: '600',
                    }}>
                    21 JUN
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={{flex: 9, marginHorizontal: 20}}>
        <ScrollView>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
            return (
              <View>
                <View>
                  <View></View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
