import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import {sendtime, showtime} from '../../AppFunction';
import Color from '../../asset/Color';
import Navbar from '../../components/Navbar';
import {days, weeks} from '../../customhook/useGetavailability';
import {useClinicsList} from '../Clinic/Profile/useGetcliniclist';
import type {RootState} from '../../redux/Store';
import {useAddavailability} from '../../customhook/useAddavailability';
import Btn from '../../components/Btn';
import useKeyboardAvoidHook from '../../utils/KeyboardAvoidHook';
import {SafeAreaView} from 'react-native-safe-area-context';
import {commonStyles} from '../../asset/styles';
import CheckBox from 'react-native-check-box';
import {useAlert} from '../../utils/useShowAlert';

export default function LoggedInDoctorAvailability() {
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  useKeyboardAvoidHook();

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={commonStyles.screenContainer}>
      <ScrollView
        bounces={false}
        contentContainerStyle={commonStyles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
        style={commonStyles.scroll}>
        <DoctorAvailabilityWithId id={userId} />
      </ScrollView>
    </SafeAreaView>
  );
}

export const DoctorAvaiability = (props: any) => {
  return (
    <DoctorAvailabilityWithId
      id={props.route.params?.id}
      clinic_id={props.route.params?.clinic_id}
    />
  );
};

export function DoctorAvailabilityWithId(props: {
  id: string;
  clinic_id?: string;
}) {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [openweek, setOpenweek] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedclinic, setselectedclinic] = useState(props.clinic_id ?? null);
  const [datefrom, setDatefrom] = useState(new Date());
  const [dateto, setDateto] = useState(new Date());
  const [selectedday, setselectedday] = useState([]);
  const [selectedweek, setselectedweek] = useState([]);
  const [noofslot, setnoofslot] = useState<number>(0);
  const [allweeks, setallweeks] = useState(true);

  const {data: cliniclist} = useClinicsList({doctor_id: props.id});

  const onChangefrom = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDatefrom(currentDate);
  };
  const {errorAlert, successAlert} = useAlert();

  const onChangeto = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDateto(currentDate);
  };

  const showModefrom = () => {
    DateTimePickerAndroid.open({
      value: datefrom,
      onChange: onChangefrom,
      mode: 'time',
      is24Hour: false,
      display: 'spinner',
    });
  };

  const showModeto = () => {
    DateTimePickerAndroid.open({
      value: dateto,
      onChange: onChangeto,
      mode: 'time',
      is24Hour: false,
      display: 'spinner',
    });
  };
  const {mutate: addAvailability} = useAddavailability({
    onSuccess: () => navigation.navigate('Profile'),
  });
  async function submithandler() {
    if (!selectedclinic) {
      errorAlert('Please Select Clinic', '');
      return;
    }
    if (selectedday.length == 0) {
      errorAlert('Please Select day', '');
      return;
    }
    if (!noofslot) {
      errorAlert('Please Enter No. of Day', '');
      return;
    }
    if (!allweeks && selectedweek.length == 0) {
      errorAlert('Please select week', '');
      return;
    }

    let payload = {
      entry_id: uuid.v4().toString(),
      doctor_id: props.id,
      clinic_id: selectedclinic ?? '',
      week_day: selectedday ?? [],
      from_time: sendtime(datefrom.getTime()),
      to_time: sendtime(dateto.getTime()),
      no_of_slot: noofslot,
      month_week: selectedweek,
      all_weeks: allweeks,
    };

    addAvailability(payload);
  }

  return (
    <>
      <Navbar title="Add Availability" asFullScreenModal />
      <View style={{gap: 10, marginHorizontal: 20}}>
        {!props.clinic_id && (
          <View style={{zIndex: 2000}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Clinic
            </Text>
            <DropDownPicker
              open={open1}
              value={selectedclinic}
              items={
                cliniclist?.map?.(c => ({label: c.name, value: c.id})) ?? []
              }
              setOpen={setOpen1}
              setValue={setselectedclinic}
              placeholder="Select Clinic"
            />
          </View>
        )}
        <View style={commonStyles.flexRowAlignCenter}>
          <CheckBox
            style={{padding: 10}}
            checkBoxColor={Color.primary}
            onClick={() => {
              setallweeks(!allweeks);
            }}
            isChecked={allweeks}
            leftText={''}
          />

          <View style={{marginLeft: 10}}>
            <Text style={{color: 'black'}}>All Weeks</Text>
          </View>
        </View>
        {!allweeks ? (
          <>
            <View style={{zIndex: 1001}}>
              <DropDownPicker
                open={openweek}
                value={selectedweek}
                items={weeks}
                setOpen={setOpenweek}
                setValue={setselectedweek}
                placeholder="Select Weeks"
                multipleText={selectedweek
                  .sort()
                  .reduce((a, c) => a + weeks[c].label + ', ', '')}
                multiple
              />
            </View>
          </>
        ) : null}

        {/* <ScrollView> */}
        <View style={{zIndex: 1000}}>
          <DropDownPicker
            open={open}
            value={selectedday}
            items={days}
            setOpen={setOpen}
            dropDownContainerStyle={{
              // backgroundColor: '#dfdfdf',
              position: 'absolute', // to fix scroll issue ... it is by default 'absolute'
              top: 50, //to fix gap between label box and container
              maxHeight: 500,
            }}
            setValue={setselectedday}
            placeholder="Select days"
            multipleText={selectedday
              .sort()
              .reduce((a, c) => a + days[c].label + ', ', '')}
            multiple
          />
        </View>
        {/* </ScrollView> */}

        <View style={commonStyles.flexRowAlignCenter}>
          <Text style={{color: 'black'}}>From Time:</Text>

          <TouchableOpacity onPress={showModefrom}>
            <Text style={{color: 'black'}}>
              {datefrom ? showtime(datefrom.getTime()) : 'Select Time'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={commonStyles.flexRowAlignCenter}>
          <Text style={{color: 'black'}}>To Time:</Text>

          <TouchableOpacity onPress={showModeto}>
            <Text style={{color: 'black'}}>
              {dateto ? showtime(dateto.getTime()) : 'Select Time'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={commonStyles.flexRowAlignCenter}>
          <Text style={{color: 'black'}}>No of Slot:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => {
              setnoofslot(Number(text));
            }}></TextInput>
        </View>
        <View style={{marginTop: 30, width: '80%', alignSelf: 'center'}}>
          <Btn onPress={submithandler} title="Submit" />
        </View>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    color: 'black',
    width: '80%',
  },
});
