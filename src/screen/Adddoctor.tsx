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
import {FormProvider, useForm} from 'react-hook-form';
import {RHFTextInput} from '../components/RHFInputs/RHFTextInput';
import {RHFDropdown} from '../components/RHFInputs/RHFDropdown';
import {validateEmail, validatePhone} from '../utils/validations';
import Navbar from '../components/Navbar';

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
      console.log('success.');
      navigation.goBack();
    },
  });
  const {mutate: linkDoctorMutate} = useLinkDoctorMutation(() => {
    navigation.goBack();
  });
  const formMethods = useForm<DoctorAddForm>();
  const mobile = formMethods.watch('mobile');
  const {data: existingDoctors} = useGetDoctorsList(
    {mobile: mobile},
    mobile?.length === 10,
  );
  async function submithandler(formValues: DoctorAddForm) {
    try {
      let payload: AddDoctorRequest = {
        mobile: formValues.mobile,
        email: formValues.email,
        name: formValues.name,
        password: formValues.password,
        clinic_id: userId ?? '',
        degree: '',
        active: true,
        profile_image_key: '',
        speciality: formValues.speciality,
        about: '',
      };
      console.log('payload; ', payload);
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
      <View
        style={{position: 'absolute', right: 20, top: 20}}
        onTouchEnd={() => navigation.goBack()}>
        <Icon name="close" size={24} style={{color: Color.primary}} />
      </View>
      <View style={styles.headContainer}>
        <Text style={styles.head}>Fill Doctor Details</Text>
      </View>
      <FormProvider {...formMethods}>
        <View style={styles.formContainer}>
          <View style={styles.rowItem}>
            <Icon name="mobile1" size={20} color="black" />
            <RHFTextInput
              name="mobile"
              placeholder="Mobile No"
              keyboardType="numeric"
              required
              rules={{validate: validatePhone}}
            />
          </View>
          {!existingDoctors?.length ? (
            <>
              <View style={styles.rowItem}>
                <Icon name="user" size={20} color="black" />
                <RHFTextInput name="name" placeholder="Full Name" required />
              </View>

              <View style={styles.rowItem}>
                <Icon name="tago" size={20} color="black" />
                <RHFDropdown
                  name={'speciality'}
                  options={specialitylist}
                  placeholder="Select speciality"
                  required
                />
              </View>

              <View style={styles.rowItem}>
                <Icon name="mail" size={20} color="black" />

                <RHFTextInput
                  name={'email'}
                  placeholder="Email"
                  required
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.rowItem}>
                <Icon name="key" size={20} color="black" />

                <RHFTextInput
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  required
                />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Btn
                  onPress={formMethods.handleSubmit(submithandler)}
                  title={'Submit'}
                />
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
              <Text style={{color: 'black'}}>
                {existingDoctors?.[0]?.email}
              </Text>
              <Text style={{color: 'black'}}>
                {existingDoctors?.[0]?.speciality}
              </Text>
              <Button title="Link" onPress={linkDoctor} color={Color.primary} />
            </View>
          )}
        </View>
      </FormProvider>
    </View>
  );
}

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 40,
    marginRight: 60,
  },
  rowItem: {
    ...commonStyles.flexRowAlignCenter,
    ...commonStyles.gap10,
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
