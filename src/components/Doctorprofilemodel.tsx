import React, {useEffect} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Color from './../asset/Color';
import {FormProvider, useForm} from 'react-hook-form';
import {RHFTextInput} from './RHFTextInput';
import Icon from 'react-native-vector-icons/AntDesign';
import Btn from './Btn';
import {AddressDto, DoctorDto} from './../types';
import {AddressStyles} from './Address/styles';
import {ProfileForm} from '../screen/Doctorprofile';

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
    },
  });
  useEffect(() => {
    if (doctorDetails) {
      formMethods.reset({
        about: doctorDetails?.about,
        consultationTime: doctorDetails?.appointment_time?.toString(),
        fees: doctorDetails?.fees?.toString(),
        username: doctorDetails?.name ?? '',
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
              />
              <RHFTextInput
                name="consultationTime"
                placeholder={'Consultation Time (in minutes)'}
                style={AddressStyles.textInput}
              />
              <RHFTextInput
                name="fees"
                placeholder={'Consultation Fees'}
                style={AddressStyles.textInput}
              />
              <RHFTextInput
                name="about"
                placeholder={'About'}
                style={{
                  ...AddressStyles.textInput,
                  height: 100,
                  borderRadius: 10,
                }}
                multiline={true}
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
