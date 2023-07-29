import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import type {RootState} from '../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import {updateappstate} from './../redux/reducer/Authreducer';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRegister} from '../customhook/useRegister';
import {useAddDoctor} from '../customhook/useadddoctor';
import {AddDoctorRequest} from '../types';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Adddoctor() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const Appdata = useSelector((state: RootState) => state);
  const {mutate: addDoctor} = useAddDoctor({
    onSuccess: () => {
      console.log('sus=ccess');
      navigation.goBack();
    },
  });

  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [speciality, setspeciality] = useState('');
  const [open1, setOpen1] = useState(false);

  const specialitylist = [
    {
      value: 'Neurology',
      label: 'Neurology',
    },
    {
      value: 'Radiology',
      label: 'Radiology',
    },
    {
      value: 'Cardiology',
      label: 'Cardiology',
    },
    {
      value: 'Otorhinolaryngology',
      label: 'Otorhinolaryngology',
    },
  ];

  async function submithandler() {
    try {
      let payload: AddDoctorRequest = {
        mobile: mobile,
        email: email,
        name: name,
        password: password,
        clinic_id: Appdata.Appdata.userid ?? '',
        degree: '',
        active: true,
        profile_image_key: '',
        speciality: speciality,
        usertype: 2,
      };

      console.log('payload', payload);

      addDoctor(payload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}></View>
      <View style={{flex: 3, justifyContent: 'center'}}></View>
      <View style={{flex: 0.7, marginLeft: 50}}>
        <Text style={{color: Color.black, fontSize: 22, fontWeight: 'bold'}}>
          Fill Doctor Details
        </Text>
      </View>

      <View style={{flex: 1, marginLeft: 50}}></View>

      <View style={{flex: 6}}>
        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <Icon name="user" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              marginLeft: 10,
              height: 40,
              flex: 1,
            }}
            placeholder="Please enter Full Name."
            onChangeText={text => {
              setname(text);
            }}
          />
        </View>

        <View style={{flex: 2, marginHorizontal: 70}}>
          <View style={{marginTop: 10}}>
            <DropDownPicker
              style={{borderBottomWidth: 1}}
              open={open1}
              value={speciality}
              items={specialitylist}
              setOpen={setOpen1}
              setValue={setspeciality}
              // setItems={setItems}
              placeholder="Select speciality"
            />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <Icon name="mobile1" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              height: 40,
              marginLeft: 10,
              flex: 1,
            }}
            placeholder="Please enter Mobile No."
            keyboardType="numeric"
            onChangeText={text => {
              setmobile(text);
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <MaterialIcon name="email" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              height: 40,
              marginLeft: 10,
              flex: 1,
            }}
            placeholder="Please enter Email"
            onChangeText={text => {
              setemail(text);
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <FontAwesome5 name="lock" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              height: 40,
              marginLeft: 10,
              flex: 1,
            }}
            placeholder="Please enter Password"
            onChangeText={text => {
              setpassword(text);
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{backgroundColor: Color.primary, borderRadius: 5}}
            onPress={submithandler}>
            <Text style={{fontSize: 20, color: 'white', padding: 10}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: 'flex-end',
          marginBottom: 30,
          alignItems: 'center',
        }}></View>
    </View>
  );
}
