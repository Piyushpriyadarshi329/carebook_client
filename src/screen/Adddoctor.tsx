import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import {commonStyles} from '../asset/styles';
import type {RootState} from '../redux/Store';
import {AddDoctorRequest} from '../types';
import {
  useAddDoctor,
  useGetDoctorsList,
  useLinkDoctorMutation,
} from './useDoctorQuery';
import Btn from '../components/Btn';

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
interface DoctorAddForm {
  name: string;
  mobile: string;
  email: string;
  password: string;
  speciality: string;
}
export default function Adddoctor() {
  const navigation = useNavigation();
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  const {mutate: addDoctor} = useAddDoctor({
    onSuccess: () => {
      navigation.goBack();
    },
  });
  const {mutate: linkDoctorMutate} = useLinkDoctorMutation(() => {
    navigation.goBack();
  });
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [speciality, setspeciality] = useState('');
  const [open1, setOpen1] = useState(false);
  const {data: existingDoctors} = useGetDoctorsList(
    {mobile: mobile},
    mobile.length === 10,
  );
  async function submithandler() {
    try {
      let payload: AddDoctorRequest = {
        mobile: mobile,
        email: email,
        name: name,
        password: password,
        clinic_id: userId ?? '',
        degree: '',
        active: true,
        profile_image_key: '',
        speciality: speciality,
        usertype: 2,
      };

      addDoctor(payload);
    } catch (error) {
      console.log(error);
    }
  }
  const linkDoctor = () => {
    linkDoctorMutate({
      clinic_id: userId,
      doctor_id: existingDoctors?.[0].id ?? '',
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.headContainer}>
        <Text style={styles.head}>Fill Doctor Details</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Icon name="mobile1" size={20} color="black" />
          <TextInput
            placeholderTextColor={'black'}
            style={styles.textInput}
            placeholder="Mobile No"
            keyboardType="numeric"
            onChangeText={text => {
              setmobile(text.trim());
            }}
          />
        </View>
        {!existingDoctors?.length ? (
          <>
            <View style={styles.fieldContainer}>
              <Icon name="user" size={20} color="black" />
              <TextInput
                placeholderTextColor={'black'}
                style={styles.textInput}
                placeholder="Full Name"
                onChangeText={text => {
                  setname(text);
                }}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Icon name="tago" size={20} color="black" />
              <View style={{width: '80%'}}>
                <DropDownPicker
                  open={open1}
                  style={[styles.textInput, {width: '100%'}]}
                  value={speciality}
                  items={specialitylist}
                  setOpen={setOpen1}
                  setValue={setspeciality}
                  placeholder="Select speciality"
                />
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <View style={{marginTop: 10}}>
                <Icon name="mail" size={20} color="black" />
              </View>
              <TextInput
                placeholderTextColor={'black'}
                style={styles.textInput}
                placeholder="Email"
                onChangeText={text => {
                  setemail(text);
                }}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Icon name="key" size={20} color="black" />

              <TextInput
                placeholderTextColor={'black'}
                style={styles.textInput}
                placeholder="Password"
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
              <Btn onPress={submithandler} title={'Submit'} />
            </View>
          </>
        ) : (
          <View
            style={{
              backgroundColor: Color.tertiary,
              marginHorizontal: 50,
              borderRadius: 10,
              padding: 20,
            }}>
            <Text style={{color: 'black'}}>{existingDoctors?.[0]?.name}</Text>
            <Text style={{color: 'black'}}>{existingDoctors?.[0]?.email}</Text>
            <Text style={{color: 'black'}}>
              {existingDoctors?.[0]?.speciality}
            </Text>
            <Button title="Link" onPress={linkDoctor} color={Color.primary} />
          </View>
        )}
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

export const styles = StyleSheet.create({
  formContainer: {
    flex: 6,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  fieldContainer: {
    ...commonStyles.flexRowAlignCenter,
    gap: 15,
    paddingHorizontal: 10,
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    color: 'black',
    width: '80%',
  },
  headContainer: {
    marginVertical: 60,
    paddingVertical: 60,
    justifyContent: 'center',
  },
  head: {
    color: Color.black,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
