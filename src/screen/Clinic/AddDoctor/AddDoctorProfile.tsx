import React, {useEffect} from 'react';
import DoctorEditForm from '../../Doctor/Profile/Edit/Form';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../redux/Store';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppPages} from '../../../Routes/appPages';
import {FormProvider, useForm} from 'react-hook-form';
import {ProfileForm} from '../../Doctor/Profile';
import {useGetDoctor, useMutateDoctorProfile} from '../../useDoctorQuery';
import Navbar from '../../../components/Navbar';
import Color from '../../../asset/Color';

const AddDoctorProfile = (props: any) => {
  const navigation = useNavigation<any>();
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  const doctorId = props.route?.params?.id as string;
  const {data: doctorDetails} = useGetDoctor({id: doctorId, clinic_id: userId});
  const formMethods = useForm<ProfileForm>({
    defaultValues: {
      about: doctorDetails?.about,
      consultationTime: doctorDetails?.appointment_time?.toString(),
      fees: doctorDetails?.fees?.toString(),
      username: doctorDetails?.name ?? '',
      degree: doctorDetails?.degree ?? '',
      experience: doctorDetails?.experience?.toString(),
      speciality: doctorDetails?.speciality ?? '',
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
        experience: doctorDetails.experience?.toString(),
        speciality: doctorDetails.speciality ?? '',
      });
    }
  }, [doctorDetails]);
  const {mutate: updateDoctor} = useMutateDoctorProfile(doctorId ?? '', () =>
    onSubmit(),
  );
  const updateProfileHandler = (formValues: ProfileForm) => {
    updateDoctor({
      name: formValues.username,
      appointment_time: Number(formValues.consultationTime),
      fees: Number(formValues.fees),
      about: formValues.about,
      speciality: formValues.speciality,
      experience: Number(formValues.experience),
      degree: formValues.degree,
      clinic_id: userId,
    });
  };
  const onSubmit = () => {
    navigation.navigate('DoctorProfile', {
      id: props.route.params.id,
      clinic_id: userId,
    });
  };
  const onSkip = () => {
    navigation.navigate(AppPages.DoctorList);
  };
  console.log(props.route.params.id);
  return (
    <View style={{flex: 1}}>
      <Navbar title="Add Profile Details" blockBack />
      <FormProvider {...formMethods}>
        <DoctorEditForm
          onSubmit={formMethods.handleSubmit(updateProfileHandler)}
          onSkip={onSkip}
          bgColor={Color.greybgc}
        />
      </FormProvider>
    </View>
  );
};

export default AddDoctorProfile;
