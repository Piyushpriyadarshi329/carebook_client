import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {useSelector} from 'react-redux';
import Color from '../../../asset/Color';
import Navbar from '../../../components/Navbar';
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
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  return <LeaveById id={props.route.params.id} clinic_id={userId} />;
};

function LeaveById(props: {id: string; clinic_id?: string}) {
  const navigation = useNavigation();
  const {errorAlert, successAlert} = useAlert();
  const [multipledate, setmultipledate] = useState(false);
  const [fullday, setfullday] = useState(false);
  const [reason, setreason] = useState('');
  const [fromdate, setfromdate] = useState<Date | null>(null);
  const [todate, settodate] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblework_time, setModalVisiblework_time] = useState(false);
  const [modalVisibleto, setModalVisibleto] = useState(false);
  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability | null>(null);

  const {mutate: addleave} = useAddleave(() => {
    successAlert('Added Leave.');
    navigation.goBack();
  });
  async function markunavailablefun() {
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
        fromdate: new Date(fromdate).getTime(),
        todate: (multipledate ? todate?.getTime() : fromdate?.getTime()) ?? 0,
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
            checkBoxColor={Color.primary}
            onClick={() => {
              setmultipledate(!multipledate);
            }}
            style={{flex: 1, padding: 10}}
            isChecked={multipledate}
            rightText="Multiples Dates"
            rightTextStyle={commonStyles.font18}
          />
        </View>

        <View style={styles.fieldRow}>
          <Text style={commonStyles.font16}>Dates: </Text>
          {!multipledate ? (
            <TouchableOpacity
              style={styles.fromToContainer}
              onPress={() => setModalVisible(true)}>
              <View style={styles.from}>
                <Text style={commonStyles.font16}>
                  {moment(fromdate).format('ll') || 'Select Date'}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.fromToContainer}>
              <TouchableOpacity
                style={styles.from}
                onPress={() => setModalVisible(true)}>
                <Text style={commonStyles.font16}>
                  {moment(fromdate).format('ll') || 'From Date'}
                </Text>
              </TouchableOpacity>
              <Text style={[commonStyles.font24, commonStyles.weight800]}>
                :
              </Text>
              <TouchableOpacity
                style={styles.to}
                onPress={() => setModalVisibleto(true)}>
                <Text style={commonStyles.font16}>
                  {moment(todate).format('ll') || 'To Date'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={commonStyles.flexRowAlignCenter}>
          <CheckBox
            style={{flex: 1, padding: 10}}
            checkBoxColor={Color.primary}
            onClick={() => {
              setfullday(!fullday);
            }}
            isChecked={fullday}
            rightText="Full Days"
            rightTextStyle={commonStyles.font18}
          />
        </View>

        {!fullday && (
          <View>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: 'black',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 5,
              }}
              onPress={() => {
                setModalVisiblework_time(!modalVisiblework_time);
              }}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Select Slot
              </Text>
              {selectedAvailability && (
                <AvailabilityCard availability={selectedAvailability} />
              )}
            </TouchableOpacity>
          </View>
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
              backgroundColor: 'white',
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
        clinicId={props.clinic_id}
      />

      <CalendarModal
        date={fromdate}
        setDate={date => {
          setfromdate(date);
        }}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        minDate={moment(new Date()).format('YYYY-MM-DD')}
      />

      <CalendarModal
        date={todate}
        setDate={date => {
          settodate(date);
        }}
        modalVisible={modalVisibleto}
        setModalVisible={setModalVisibleto}
        minDate={moment(fromdate || new Date()).format('YYYY-MM-DD')}
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
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fromToContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'white',
  },
  from: {padding: 10},
  to: {padding: 10},
});
