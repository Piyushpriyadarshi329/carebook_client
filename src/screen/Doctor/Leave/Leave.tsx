import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {useSelector} from 'react-redux';
import Color from '../../../asset/Color';
import Navbar from '../../../components/Navbar';
import {RootState} from '../../../redux/Store';
import {AddLeaveRequest} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {commonStyles} from '../../../asset/styles';
import Btn from '../../../components/Btn';
import CalendarModal from '../../../components/CalendarModal';
import {useAlert} from '../../../utils/useShowAlert';
import {
  Availability,
  AvailabilityFE,
} from '../../Availability/useGetAvailability';
import AvailabilityCard from '../Profile/AvailabilityCard';
import SlotModal from './SlotModal';
import {useAddLeave} from './useLeaveQuery';
import {getToday} from '../../../utils/dateMethods';
import {useClinicsList} from '../../Clinic/Profile/useGetcliniclist';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [multipleDate, setMultipleDate] = useState(false);
  const [fullDay, setFullDay] = useState(false);
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState<Date>(getToday());
  const tomorrow = getToday();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [toDate, setToDate] = useState<Date>(tomorrow);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleWorkTime, setModalVisibleWorkTime] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [selectedAvailability, setSelectedAvailability] =
    useState<AvailabilityFE | null>(null);
  const [selectedClinic, setSelectedClinic] = useState(props.clinic_id ?? null);

  const {data: cliniclist} = useClinicsList({doctor_id: props.id});

  const {mutate: addLeave} = useAddLeave(() => {
    successAlert('Added Leave.');
    navigation.goBack();
  });
  function onSubmit() {
    if (!fromDate) {
      errorAlert('please Select From Date');
      return;
    }

    if (multipleDate && !toDate) {
      errorAlert('please Select To Date');
      return;
    }

    if (!fullDay && !selectedAvailability) {
      errorAlert('please Select Slot');
      return;
    }

    let payload: AddLeaveRequest = {
      doctor_id: props.id,
      fromdate: new Date(fromDate).getTime(),
      todate: (multipleDate ? toDate?.getTime() : fromDate?.getTime()) ?? 0,
      worktime_id: fullDay ? '' : selectedAvailability?.id ?? '',
      fullday: fullDay,
      reason: reason,
      clinic_id: selectedClinic ?? '',
    };
    if (payload.fromdate > payload.todate) {
      errorAlert('Please Select Valid Dates');
      return;
    }
    addLeave(payload);
  }

  return (
    <>
      <Navbar title="Leave" asFullScreenModal />
      <ScrollView style={styles.formContainer}>
        {!props.clinic_id && (
          <View style={{zIndex: 2000}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Clinic
            </Text>
            <DropDownPicker
              open={open1}
              value={selectedClinic}
              items={
                cliniclist?.map?.(c => ({label: c.name, value: c.id})) ?? []
              }
              setOpen={setOpen1}
              setValue={setSelectedClinic}
              placeholder="Select Clinic"
            />
          </View>
        )}

        <View style={commonStyles.flexRowAlignCenter}>
          <CheckBox
            checkBoxColor={Color.primary}
            onClick={() => {
              setMultipleDate(!multipleDate);
            }}
            style={{flex: 1, padding: 10}}
            isChecked={multipleDate}
            rightText="Multiples Dates"
            rightTextStyle={commonStyles.font18}
          />
        </View>

        <View style={styles.fieldRow}>
          <Text style={commonStyles.font16}>Dates: </Text>
          {!multipleDate ? (
            <TouchableOpacity
              style={styles.fromToContainer}
              onPress={() => setModalVisible(true)}>
              <View style={styles.from}>
                <Text style={commonStyles.font16}>
                  {moment(fromDate).format('ll') || 'Select Date'}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.fromToContainer}>
              <TouchableOpacity
                style={styles.from}
                onPress={() => setModalVisible(true)}>
                <Text style={commonStyles.font16}>
                  {moment(fromDate).format('ll') || 'From Date'}
                </Text>
              </TouchableOpacity>
              <Text style={[commonStyles.font24, commonStyles.weight800]}>
                :
              </Text>
              <TouchableOpacity
                style={styles.to}
                onPress={() => setModalVisibleTo(true)}>
                <Text style={commonStyles.font16}>
                  {moment(toDate).format('ll') || 'To Date'}
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
              setFullDay(!fullDay);
            }}
            isChecked={fullDay}
            rightText="Full Days"
            rightTextStyle={commonStyles.font18}
          />
        </View>
        {!fullDay && (
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
                setModalVisibleWorkTime(!modalVisibleWorkTime);
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
              setReason(text);
            }}></TextInput>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Btn title="Mark Unavailable" onPress={onSubmit} />
        </View>
      </ScrollView>

      <SlotModal
        value={selectedAvailability}
        setValue={p => {
          setSelectedAvailability(p);
          setModalVisibleWorkTime(false);
        }}
        modalVisible={modalVisibleWorkTime}
        setModalVisible={setModalVisibleWorkTime}
        doctorId={props.id}
        clinicId={props.clinic_id}
      />

      <CalendarModal
        date={fromDate}
        setDate={date => {
          setFromDate(date);
        }}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        minDate={moment(new Date()).format('YYYY-MM-DD')}
      />

      <CalendarModal
        date={toDate}
        setDate={date => {
          console.log('todate', date);
          setToDate(date);
        }}
        modalVisible={modalVisibleTo}
        setModalVisible={setModalVisibleTo}
        minDate={moment(fromDate || new Date()).format('YYYY-MM-DD')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
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
