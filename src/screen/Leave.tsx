import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import CheckBox from 'react-native-check-box';
import Color from '../asset/Color';

import {Calendar, LocaleConfig} from 'react-native-calendars';
import {AddLeaveRequest} from '../types';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {useAddleave} from '../customhook/useAddleave';
import {
  Availability,
  useGetAvailabilityQuery,
} from './Availability/useGetavailability';
import {showtime} from '../AppFunction';
import {useNavigation} from '@react-navigation/native';
import Btn from '../components/Btn';
import {commonStyles} from '../asset/styles';
import AvailabilityCard from '../components/AvailabilityCard';
import {useAlert} from '../utils/useShowAlert';

export function LoggedInUserLeave() {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  return <LeaveById id={userId} />;
}
export const Leave = (props: any) => {
  return <LeaveById id={props.route.params.id} />;
};

const {errorAlert, successAlert} = useAlert();

function LeaveById(props: {id: string}) {
  const navigation = useNavigation();

  const [multipledate, setmultipledate] = useState(false);
  const [fullday, setfullday] = useState(false);
  const [reason, setreason] = useState('');
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblework_time, setModalVisiblework_time] = useState(false);
  const [modalVisibleto, setModalVisibleto] = useState(false);

  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability | null>(null);
  const {data: availabilityList} = useGetAvailabilityQuery({
    doctor_id: props.id,
  });

  const {mutate: addleave} = useAddleave(() => {
    navigation.goBack();
  });
  async function markunavailablefun() {
    console.log(
      'todate',
      todate + 'T00:00:00Z',
      new Date(fromdate + 'T00:00:00Z').getTime(),
    );
    // return;
    try {
      if (!fromdate) {
        errorAlert('please Select From Date');
        return;
      }

      if (multipledate && !todate) {
        errorAlert('please Select To Date');
        return;
      }

      if (!fullday && !selectedAvailability) {
        errorAlert('please Select Slot');
        return;
      }

      let payload: AddLeaveRequest = {
        doctor_id: props.id,
        fromdate: new Date(fromdate + 'T00:00:00Z').getTime(),
        todate: multipledate
          ? new Date(todate + 'T00:00:00Z').getTime()
          : new Date(fromdate + 'T00:00:00Z').getTime(),
        worktime_id: fullday ? '' : selectedAvailability?.id ?? '',
        fullday: fullday,
        reason: reason,
      };

      console.log('payload addleave', payload);

      addleave(payload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{backgroundColor: 'white'}}>
          <View>
            <Calendar
              onDayPress={day => {
                console.log('day.dateString', day.dateString);
                setfromdate(day.dateString);
              }}
              minDate={new Date()}
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

          <View style={{alignItems: 'center', marginTop: 20}}>
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
        <View style={{backgroundColor: 'white'}}>
          <View>
            <Calendar
              onDayPress={day => {
                console.log('day.dateString', day.dateString);

                settodate(day.dateString);
              }}
              minDate={new Date(fromdate + 'T00:00:00Z') || new Date()}
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

          <View style={{alignItems: 'center', marginTop: 20}}>
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
        <View style={{backgroundColor: 'white'}}>
          <ScrollView>
            <View style={{flex: 7, marginTop: 50}}>
              {availabilityList?.map(availability => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAvailability(availability);
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        backgroundColor:
                          selectedAvailability?.id == availability.id
                            ? Color.secondary
                            : Color.primary,
                        borderRadius: 5,
                      }}>
                      <View style={{alignItems: 'flex-start'}}>
                        <Text
                          style={{
                            textAlign: 'left',
                            padding: 5,
                            color: 'black',
                          }}>
                          {availability.clinic_name}
                        </Text>
                        <Text style={{padding: 5, color: 'black'}}>
                          Slots: {availability.no_of_slot}
                        </Text>
                      </View>
                      <View style={{flex: 2, alignItems: 'center'}}>
                        <Text style={{padding: 5, color: 'black'}}>
                          {availability.week_day}
                        </Text>
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <Text style={{padding: 5, color: 'black'}}>
                          {showtime(Number(availability?.from_time))}
                        </Text>
                        <Text style={{padding: 5, color: 'black'}}>
                          {showtime(Number(availability?.to_time))}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={{alignItems: 'center', marginTop: 20}}>
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

      <Navbar title="Leave" asFullScreenModal />
      <View style={styles.formContainer}>
        <View style={commonStyles.flexRowAlignCenter}>
          <CheckBox
            style={{padding: 10}}
            checkBoxColor={Color.primary}
            onClick={() => {
              setmultipledate(!multipledate);
            }}
            isChecked={multipledate}
            leftText={''}
          />
          <Text style={{color: 'black'}}>Multiples Dates</Text>
        </View>

        <View style={commonStyles.flexRowAlignCenter}>
          <Text style={{color: 'black'}}>
            {multipledate ? 'From Date:' : 'For Date:'}
          </Text>

          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={{color: 'black'}}>
              {fromdate ? fromdate : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </View>

        {multipledate ? (
          <View style={commonStyles.flexRowAlignCenter}>
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
        ) : null}

        <View style={commonStyles.flexRowAlignCenter}>
          <CheckBox
            style={{padding: 10}}
            checkBoxColor={Color.primary}
            onClick={() => {
              setfullday(!fullday);
            }}
            isChecked={fullday}
            leftText={''}
          />
          <Text style={{color: 'black'}}>Full Days</Text>
        </View>

        {!fullday ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisiblework_time(!modalVisiblework_time);
              }}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Select Slot
              </Text>
            </TouchableOpacity>

            <View>
              {selectedAvailability && (
                <AvailabilityCard availability={selectedAvailability} />
              )}
            </View>
          </View>
        ) : (
          <></>
        )}

        <View>
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
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Btn title="Mark Unavailable" onPress={markunavailablefun} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 20,
    color: 'black',
    marginHorizontal: 20,
  },
});
