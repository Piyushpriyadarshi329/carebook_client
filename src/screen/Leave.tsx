import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import CheckBox from 'react-native-check-box';
import Color from '../asset/Color';
import DropDownPicker from 'react-native-dropdown-picker';

import {Calendar, LocaleConfig} from 'react-native-calendars';
import {AddLeaveRequest} from '../types';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {useAddleave} from '../customhook/useAddleave';
import {useGetavailability} from '../customhook/useGetavailability';
import {showtime} from '../AppFunction';
import {useNavigation} from '@react-navigation/native';

export default function LoggedInUserLeave() {
  const Appdata = useSelector((state: RootState) => state);
  return <LeaveById id={Appdata.Appdata.userid} />;
}
export const Leave = (props: any) => {
  return <LeaveById id={props.route.params.id} />;
};

export function LeaveById(props: {id: string}) {
  const Appdata = useSelector((state: RootState) => state);
  const navigation = useNavigation();

  const [Availability, setAvailability] = useState([]);
  const [multipledate, setmultipledate] = useState(false);
  const [fullday, setfullday] = useState(false);
  const [reason, setreason] = useState('');
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblework_time, setModalVisiblework_time] = useState(false);
  const [modalVisibleto, setModalVisibleto] = useState(false);

  const [worktime_id, setworktime_id] = useState<any>(null);

  useEffect(() => {
    getdoctoravailability();
  }, []);
  const days = [
    {
      value: 0,
      label: 'SUN',
    },
    {
      value: 1,
      label: 'MON',
    },
    {
      value: 2,
      label: 'TUE',
    },
    {
      value: 3,
      label: 'WED',
    },
    {
      value: 4,
      label: 'THU',
    },
    {
      value: 5,
      label: 'FRI',
    },
    {
      value: 6,
      label: 'SAT',
    },
  ];

  async function getdoctoravailability() {
    try {
      let payload: any = {
        doctor_id: Appdata.Appdata.userid,
      };

      console.log('payload', payload);

      let res: any = await useGetavailability(payload);

      console.log('res', res.data.data);

      let newdata: any = [];

      res.data.data.map((i: any) => {
        let local = newdata.filter((j: any) => j.entry_id == i.entry_id);

        if (local.length > 0) {
          // console.log("local.length",local.length)

          // console.log("index",newdata.indexOf(i))
          newdata = newdata.map((k: any) => {
            if (k.entry_id == i.entry_id) {
              return {
                ...k,
                week_day: k.week_day + ',' + days[i.week_day].label,
              };
            } else {
              return k;
            }
          });
        } else {
          newdata.push({...i, week_day: days[i.week_day].label});
        }
      });

      console.log('newdata', newdata);

      setAvailability(newdata);
    } catch (error) {
      console.log(error);
    }
  }

  async function markunavailablefun() {
    try {
      let payload: AddLeaveRequest = {
        doctor_id: Appdata.Appdata.userid,
        fromdate: new Date(todate + 'T00:00:00Z').getTime(),
        todate: multipledate
          ? new Date(fromdate + 'T00:00:00Z').getTime()
          : new Date(todate + 'T00:00:00Z').getTime(),
        worktime_id: fullday ? '' : worktime_id.id,
        fullday: fullday,
        reason: reason,
      };

      console.log('payload addleave', payload);

      let addleaveres: any = await useAddleave(payload);

      console.log('addleaveres', addleaveres.data);

      if (addleaveres.data.Success) {
        alert('Mark Unavailable add Successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View>
            <Calendar
              onDayPress={day => {
                console.log('day.dateString', day.dateString);
                setfromdate(day.dateString);
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
                [fromdate]: {
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

      <Modal animationType="slide" transparent={true} visible={modalVisibleto}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View>
            <Calendar
              onDayPress={day => {
                settodate(day.dateString);
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
                [todate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: Color.primary,
                },
              }}
            />
          </View>

          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              style={{backgroundColor: Color.primary, borderRadius: 5}}
              onPress={() => {
                setModalVisibleto(!modalVisibleto);
              }}>
              <Text style={{fontSize: 16, color: 'black', padding: 10}}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblework_time}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView>
            <View style={{flex: 7, marginTop: 50, marginHorizontal: 20}}>
              {Availability.map((i: any) => {
                console.log('i', i);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setworktime_id(i);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        backgroundColor:
                          worktime_id?.id == i.id
                            ? Color.secondary
                            : Color.primary,
                        borderRadius: 5,
                      }}>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text
                          style={{
                            textAlign: 'left',
                            padding: 5,
                            color: 'black',
                          }}>
                          {i.clinic_name}
                        </Text>
                        <Text style={{padding: 5, color: 'black'}}>
                          Slots: {i.no_of_slot}
                        </Text>
                      </View>
                      <View style={{flex: 2, alignItems: 'center'}}>
                        <Text style={{padding: 5, color: 'black'}}>
                          {i.week_day}
                        </Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{padding: 5, color: 'black'}}>
                          {showtime(i.from_time)}
                        </Text>
                        <Text style={{padding: 5, color: 'black'}}>
                          {showtime(i.to_time)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              style={{backgroundColor: Color.primary, borderRadius: 5}}
              onPress={() => {
                setModalVisiblework_time(!modalVisiblework_time);
              }}>
              <Text style={{fontSize: 16, color: 'black', padding: 10}}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1}}>
        <Navbar title="Leave" />
      </View>

      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
        <View>
          <CheckBox
            style={{flex: 1, padding: 10}}
            checkBoxColor={Color.primary}
            onClick={() => {
              setmultipledate(!multipledate);
            }}
            isChecked={multipledate}
            leftText={''}
          />
        </View>

        <View style={{marginTop: 10, marginLeft: 10}}>
          <Text style={{color: 'black'}}>Multiples Dates</Text>
        </View>
      </View>

      <View style={{marginLeft: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>
            {' '}
            {multipledate ? 'From Date:' : 'For Date:'}{' '}
          </Text>

          <View style={{marginLeft: 20}}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: 'black'}}>
                {fromdate ? fromdate : 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {multipledate ? (
        <View style={{marginLeft: 20, marginTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black'}}>To Date:</Text>

            <View style={{marginLeft: 20}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleto(!modalVisible);
                }}>
                <Text style={{color: 'black'}}>
                  {todate ? todate : 'select Date'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}

      <View style={{flex: 1, marginTop: 20}}>
        <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
          <View>
            <CheckBox
              style={{flex: 1, padding: 10}}
              checkBoxColor={Color.primary}
              onClick={() => {
                setfullday(!fullday);
              }}
              isChecked={fullday}
              leftText={''}
            />
          </View>

          <View style={{marginTop: 10, marginLeft: 10}}>
            <Text style={{color: 'black'}}>Full Days</Text>
          </View>
        </View>
      </View>

      {!fullday ? (
        <View style={{flex: 1.5, marginHorizontal: 20}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              setModalVisiblework_time(!modalVisiblework_time);
            }}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              click to Select Slot :
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: 1}}>
            {worktime_id ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  backgroundColor: Color.primary,
                  borderRadius: 5,
                }}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      textAlign: 'left',
                      padding: 5,
                      color: 'black',
                    }}>
                    Clinic 1
                  </Text>
                  <Text style={{padding: 5, color: 'black'}}>
                    Slots: {worktime_id.no_of_slot}
                  </Text>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                  <Text style={{padding: 5, color: 'black'}}>
                    {worktime_id.week_day}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{padding: 5, color: 'black'}}>
                    {showtime(worktime_id.from_time)}
                  </Text>
                  <Text style={{padding: 5, color: 'black'}}>
                    {showtime(worktime_id.to_time)}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      ) : (
        <View style={{flex: 1.5, marginHorizontal: 20}}></View>
      )}

      <View style={{flex: 2.5, marginHorizontal: 20}}>
        <Text style={{color: 'black'}}>Reason</Text>

        <TextInput
          multiline
          style={{
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
            color: 'black',
          }}
          onChangeText={text => {
            setreason(text);
          }}></TextInput>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={markunavailablefun}
          style={{backgroundColor: Color.primary, borderRadius: 5}}>
          <Text
            style={{
              color: 'black',
              padding: 5,
              fontSize: 16,
              fontWeight: '700',
            }}>
            Mark Unavailable
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 2}}></View>
    </View>
  );
}
