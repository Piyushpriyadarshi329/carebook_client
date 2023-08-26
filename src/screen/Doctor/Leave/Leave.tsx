import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Color from '../../../asset/Color';
import Navbar from '../../../components/Navbar';

import {useSelector} from 'react-redux';
import {useAddleave} from '../../../customhook/useAddleave';
import {RootState} from '../../../redux/Store';
import {AddLeaveRequest} from '../../../types';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {commonStyles} from '../../../asset/styles';
import Btn from '../../../components/Btn';
import CalendarModal from '../../../components/CalendarModal';
import {useAlert} from '../../../utils/useShowAlert';
import {Availability} from '../../Availability/useGetAvailability';
import AvailabilityCard from '../Profile/AvailabilityCard';
import SlotModal from './SlotModal';

export function LoggedInUserLeave() {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  return <LeaveById id={userId} />;
}
export const Leave = (props: any) => {
  return <LeaveById id={props.route.params.id} />;
};

function LeaveById(props: {id: string}) {
  const navigation = useNavigation();
  const {errorAlert} = useAlert();
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

      addleave(payload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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

      <SlotModal
        value={selectedAvailability}
        setValue={p => {
          setSelectedAvailability(p);
          setModalVisiblework_time(false);
        }}
        modalVisible={modalVisiblework_time}
        setModalVisible={setModalVisiblework_time}
        doctorId={props.id}
      />

      <CalendarModal
        date={new Date(fromdate)}
        setDate={date => {
          setfromdate(moment(date).format('YYYY-MM-DD'));
        }}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        minDate={moment(new Date()).format('YYYY-MM-DD')}
      />

      <CalendarModal
        date={new Date(todate)}
        setDate={date => {
          settodate(moment(date).format('YYYY-MM-DD'));
        }}
        modalVisible={modalVisibleto}
        setModalVisible={setModalVisibleto}
        minDate={moment(new Date(fromdate + 'T00:00:00Z') || new Date()).format(
          'YYYY-MM-DD',
        )}
      />
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
