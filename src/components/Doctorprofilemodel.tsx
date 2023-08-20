import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ProfileForm} from '../screen/Doctorprofile';
import Color from './../asset/Color';
import {DoctorDto} from './../types';
import {AddressStyles} from './Address/styles';
import Btn from './Btn';
import {RHFTextInput} from './RHFInputs/RHFTextInput';

export const Doctorprofilemodel = ({
  editMode,
  setEditMode,
  onSubmit,
  doctorDetails,
}: {
  editMode: boolean;
  setEditMode: any;
  onSubmit: (p: ProfileForm) => void;
  doctorDetails?: DoctorDto;
}) => {
  const formMethods = useForm<ProfileForm>({
    defaultValues: {
      about: doctorDetails?.about,
      consultationTime: doctorDetails?.appointment_time?.toString(),
      fees: doctorDetails?.fees?.toString(),
      username: doctorDetails?.name ?? '',
      degree: doctorDetails?.degree ?? '',
      experience: doctorDetails?.experience ?? 0,
    },
  });
  useEffect(() => {
    if (doctorDetails) {
      formMethods.reset({
        about: doctorDetails?.about,
        consultationTime: doctorDetails?.appointment_time?.toString(),
        fees: doctorDetails?.fees?.toString(),
        username: doctorDetails?.name ?? '',
        degree: doctorDetails.degree ?? '',
        experience: doctorDetails.experience ?? 0,
      });
    }
  }, [doctorDetails]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editMode}
      onRequestClose={() => setEditMode(false)}>
      <FormProvider {...formMethods}>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.tertiary,
            marginTop: 200,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            borderColor: Color.primary,
            borderWidth: 1,
          }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
                Doctor Profile
              </Text>
            </View>
            <View style={{position: 'absolute', right: 30}}>
              <TouchableOpacity
                onPress={() => {
                  setEditMode(false);
                }}>
                <Icon
                  name="close"
                  style={{fontWeight: 'bold', fontSize: 25}}
                  color={Color.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                flex: 3,
                marginVertical: 20,
                marginHorizontal: 30,
                gap: 20,
              }}>
              <RHFTextInput
                name="username"
                placeholder={'Name'}
                style={AddressStyles.textInput}
                required
              />
              <RHFTextInput
                name="consultationTime"
                placeholder={'Consultation Time (in minutes)'}
                style={AddressStyles.textInput}
                required
              />
              <RHFTextInput
                name="fees"
                placeholder={'Consultation Fees'}
                style={AddressStyles.textInput}
                required
              />
              <RHFTextInput
                name="degree"
                placeholder={'Degree'}
                style={AddressStyles.textInput}
              />
              <RHFTextInput
                name="experience"
                placeholder={'Yrs of Experience'}
                style={AddressStyles.textInput}
                keyboardType="number-pad"
              />
              <RHFTextInput
                name="about"
                placeholder={'About'}
                style={{
                  ...AddressStyles.textInput,
                  borderRadius: 10,
                }}
                multiline={true}
                required
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Btn
                title={'Submit'}
                onPress={formMethods.handleSubmit(onSubmit)}
              />
            </View>
          </ScrollView>
        </View>
      </FormProvider>
    </Modal>
  );
};
