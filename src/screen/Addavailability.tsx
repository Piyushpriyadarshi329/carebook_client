import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetcliniclist} from '../customhook/useGetcliniclist';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../redux/Store';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {sendtime, showtime} from '../AppFunction';
import Color from '../asset/Color';
import {useAddavailability} from './../customhook/useAddavailability';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';

export default function Addavailability() {
  const Appdata = useSelector((state: RootState) => state);
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedclinic, setselectedclinic] = useState(null);
  const [datefrom, setDatefrom] = useState(new Date());
  const [dateto, setDateto] = useState(new Date());
  const [cliniclist, setcliniclist] = useState([]);
  const [selectedday, setselectedday] = useState([]);
  const [noofslot, setnoofslot] = useState<Number>(0);
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

  useEffect(() => {
    getcliniclist();
  }, []);

  useEffect(() => {
    console.log('setselectedday', selectedday);
    console.log('selectedclinic', selectedclinic);
  }, [selectedday, selectedclinic]);

  async function getcliniclist() {
    try {
      let payload = {
        doctor_id: Appdata.Appdata.userid,
      };

      let res: any = await useGetcliniclist(payload);

      console.log('res', res.data);

      let newdata: any = res.data.data.map((i: any) => {
        return {...i, label: i.name, value: i.clinic_id};
      });
      setcliniclist(newdata);
    } catch (error) {
      console.log(error);
    }
  }

  const onChangefrom = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log('currentDate', currentDate);
    setDatefrom(currentDate);
  };

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

  async function submithandler() {
    try {
      let payload: any = {
        entry_id: uuid.v4(),
        doctor_id: Appdata.Appdata.userid,
        clinic_id: selectedclinic,
        week_day: selectedday,
        from_time: sendtime(datefrom.getTime()),
        to_time: sendtime(dateto.getTime()),
        no_of_slot: noofslot,
      };

      console.log('payload', payload);

      let res: any = await useAddavailability(payload);

      console.log('res', res.data);

      if (res.data.Success) {
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '600',
            fontSize: 16,
          }}>
          Add Availability
        </Text>
      </View>

      <View style={{flex: 1.5, marginHorizontal: 20}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
          Select Clinic
        </Text>
        <View style={{marginTop: 10}}>
          <DropDownPicker
            open={open1}
            value={selectedclinic}
            items={cliniclist}
            setOpen={setOpen1}
            setValue={setselectedclinic}
            // setItems={setItems}
            placeholder="Select Clinic"
          />
        </View>
      </View>

      <View
        style={{
          flex: 0.8,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}> From Time:</Text>
        </View>
        <TouchableOpacity style={{flex: 1}} onPress={showModefrom}>
          <Text style={{color: 'black'}}>
            {' '}
            {datefrom ? showtime(datefrom.getTime()) : 'Select Time'}{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 0.8, flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}> To Time:</Text>
        </View>
        <TouchableOpacity style={{flex: 1}} onPress={showModeto}>
          <Text style={{color: 'black'}}>
            {' '}
            {dateto ? showtime(dateto.getTime()) : 'Select Time'}{' '}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, marginHorizontal: 20}}>
        {/* <MultiSelect
          hideTags
          items={days}
          uniqueKey="id"
          // ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedday}
          selectText="Pick Days"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={text => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        /> */}

        <DropDownPicker
          open={open}
          value={selectedday}
          items={days}
          setOpen={setOpen}
          setValue={setselectedday}
          // setItems={setItems}
          placeholder="Select days"
          multipleText={selectedday
            .sort()
            .reduce((a, c) => a + days[c].label + ', ', '')}
          multiple
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}>No of Slot:</Text>
        </View>

        <View style={{flex: 1, marginHorizontal: 20}}>
          <TextInput
            style={{borderWidth: 1, borderRadius: 5, textAlign: 'center'}}
            keyboardType="numeric"
            onChangeText={text => {
              console.log('text');
              setnoofslot(Number(text));
            }}></TextInput>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{backgroundColor: Color.primary, borderRadius: 10}}
          onPress={submithandler}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
              padding: 10,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 4}}></View>
    </View>
  );
}
