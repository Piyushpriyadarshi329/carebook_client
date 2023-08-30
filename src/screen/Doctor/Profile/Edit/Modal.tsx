import {Text} from '@rneui/themed';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Modal, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Color from '../../../../asset/Color';
import {DoctorDto} from '../../../../types';
import ModalCloseOnEscape from '../../../../utils/ModalCloseOnEscape';
import DoctorEditForm from './Form';
import {ProfileForm} from '..';
import {useMutateDoctorProfile} from '../../../useDoctorQuery';
import Profilepicuploadmodel from '../../../../components/Profilepicuploadmodel';

export const DoctorProfileModal = ({
  editMode,
  setEditMode,
  doctorDetails,
}: {
  editMode: boolean;
  setEditMode: any;
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
  const {mutate: updateDoctor} = useMutateDoctorProfile(
    doctorDetails?.id ?? '',
    () => setEditMode(false),
  );
  const updateProfileHandler = (formValues: ProfileForm) => {
    updateDoctor({
      name: formValues.username,
      appointment_time: Number(formValues.consultationTime),
      fees: Number(formValues.fees),
      about: formValues.about,
      speciality: formValues.speciality,
      experience: formValues.experience,
      degree: formValues.degree,
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editMode}
      onRequestClose={() => setEditMode(false)}>
      <ModalCloseOnEscape setVisible={setEditMode} />

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
              <TouchableOpacity onPress={() => setEditMode(false)}>
                <Icon
                  name="close"
                  style={{fontWeight: 'bold', fontSize: 25}}
                  color={Color.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <DoctorEditForm
            onSubmit={formMethods.handleSubmit(updateProfileHandler)}
            bgColor={Color.secondary}
          />
        </View>
      </FormProvider>
    </Modal>
  );
};
