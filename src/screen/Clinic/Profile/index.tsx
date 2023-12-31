import {Text} from '@rneui/themed';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {commonStyles} from '../../../asset/styles';
import {AddressModal} from '../../../components/Address/AddressModal';
import {
  ClinicProfile,
  Clinicprofilemodel,
} from '../../../components/Clinicprofilemodel';
import Navbar from '../../../components/Navbar';
import Profilepicuploadmodel from '../../../components/Profilepicuploadmodel';
import {RootState} from '../../../redux/Store';
import {updateappstate} from '../../../redux/reducer/Authreducer';
import {AddressDto, VisibleDocument} from '../../../types';
import {useGetDoctorsList} from '../../useDoctorQuery';
import ClinicProfileEntry from './ClinicProfileEntry';
import AboutMenuOptions from './MenuOptions';
import {useAddaddressMutation} from './useAddaddress';
import {useUpdateClinic} from './useClinicQuery';
import {useClinicsList} from './useGetcliniclist';
import {useGetLocation} from './useLocationQuery';

export default function Clinicprofile() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.Appdata.userid);
  const [addressModal, setAddressModal] = useState(false);
  const [picmodalVisible, setpicModalVisible] = useState(false); // profile pic
  const [clinicModalVisible, setClinicModalVisible] = useState(false);

  const {data: profiles, isLoading} = useClinicsList({clinic_id: userId});
  const clinicDetails = profiles?.[0];
  const qc = useQueryClient();
  const {mutate: updateClinic} = useUpdateClinic(
    clinicDetails?.id ?? '',
    () => {
      setClinicModalVisible(false);
    },
  );
  const {mutate: mutateAddress} = useAddaddressMutation({
    onSuccess: data => {
      setAddressModal(false);
      qc.invalidateQueries(['CLINICS', {clinic_id: userId}]);
    },
  });
  const {data: locations} = useGetLocation();

  function onAddress(formValues: AddressDto) {
    mutateAddress({
      id: clinicDetails?.address.id,
      user_id: userId,
      address_line1: formValues.address_line1,
      address_line2: formValues.address_line2,
      city: formValues.city,
      state: formValues.state,
      pincode: Number(formValues.pincode),
      lat: Number(formValues.lat),
      lan: Number(formValues.lan),
      type: 'Clinic',
    });
  }
  const profilePicUploadSuccessHandler = (
    data: VisibleDocument | undefined,
  ) => {
    updateClinic({
      profile_image_key: data?.fileKey,
    });
  };
  function profilehandler(formValues: ClinicProfile) {
    updateClinic({
      name: formValues.name,
      about: formValues.about,
    });
  }

  const logOutHandler = () =>
    dispatch(
      updateappstate({
        islogin: false,
        isdoctor: false,
      }),
    );
  const {data: doctorlist} = useGetDoctorsList({
    clinic_id: userId ?? '',
  });
  return (
    <MenuProvider>
      <View style={styles.container}>
        <Navbar
          title="About"
          endAdornment={
            <AboutMenuOptions
              onLogout={logOutHandler}
              setEditMode={() => setClinicModalVisible(true)}
              setEditMode2={() => setAddressModal(true)}
              edit2Title="Edit Address"
              edit1Title="Edit Profile"
            />
          }
        />
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setpicModalVisible(true)}>
              <Image
                style={styles.image}
                source={
                  clinicDetails?.profile_image
                    ? {uri: clinicDetails?.profile_image}
                    : require('../../../asset/image/hospital.png')
                }
              />
            </TouchableOpacity>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Text style={[commonStyles.font24, commonStyles.weight700]}>
                {clinicDetails?.name}
              </Text>
              <Text style={commonStyles.caption}>
                {clinicDetails?.address.address_line1}
              </Text>
              <Text style={commonStyles.caption}>
                {clinicDetails?.address.address_line2}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <ClinicProfileEntry
              label="Total Doctors"
              value={doctorlist?.length ?? '- -'}
            />
            {/* // TODO get actual Values */}
            {/* <ClinicProfileEntry label="Total Bookings" value={'85'} />
          <ClinicProfileEntry label="Average Bookings" value={'24/month'} />
          <ClinicProfileEntry label="Partner Since" value={'Apr 12 2023'} /> */}

            <View style={styles.aboutContainer}>
              <ScrollView>
                <Text style={[commonStyles.font18, commonStyles.weight600]}>
                  About
                </Text>
                <Text style={commonStyles.font16}>{clinicDetails?.about}</Text>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        {addressModal && (
          <AddressModal
            modalVisible={addressModal}
            setModalVisible={setAddressModal}
            onSubmit={onAddress}
            defaultValues={clinicDetails?.address}
          />
        )}
        <Clinicprofilemodel
          editMode={clinicModalVisible}
          setEditMode={setClinicModalVisible}
          onSubmit={profilehandler}
          profile={clinicDetails}
        />
        <Profilepicuploadmodel
          modalVisible={picmodalVisible}
          setModalVisible={setpicModalVisible}
          onSubmit={profilePicUploadSuccessHandler}
        />
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  profileSectionHeading: {color: 'black', fontSize: 18, fontWeight: '600'},

  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 20},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  image: {
    borderRadius: 150,
    height: 150,
    width: 150,
    marginTop: 20,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },

  aboutContainer: {
    marginTop: 40,
    backgroundColor: 'white',
  },
});
