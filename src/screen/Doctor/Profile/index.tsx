import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {AppPages} from '../../../appPages';
import Color from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import AvailabilityCard from './AvailabilityCard';
import Btn from '../../../components/Btn';
import {Doctorprofilemodel} from '../../../components/Doctorprofilemodel';
import Navbar from '../../../components/Navbar';
import Profilepicuploadmodel from '../../../components/Profilepicuploadmodel';
import SwipeDeleteButton from '../../../components/SwipeDeleteButton';
import {useGetLeaves} from '../../../customhook/useGetLeaves';
import type {RootState} from '../../../redux/Store';
import {updateappstate} from '../../../redux/reducer/Authreducer';
import {VisibleDocument} from '../../../types';
import {
  AvailabilityFE,
  useGetAvailabilityQuery,
  useRemoveAvailability,
} from '../../Availability/useGetAvailability';
import DoctorProfileEntry from '../../DoctorProfileEntry';
import {useGetDoctor, useMutateDoctorProfile} from '../../useDoctorQuery';
import LeaveCard from './LeaveCard';
import EditButton from '../../../components/EditButton';
import AboutMenuOptions from '../../Clinic/Profile/MenuOptions';
import {MenuProvider} from 'react-native-popup-menu';

export interface ProfileForm {
  username: string;
  about: string;
  consultationTime: string;
  fees: string;
  experience: number;
  degree: string;
  speciality: string;
}
export default function LoggedInDoctorProfile() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const userId = useSelector((state: RootState) => state.Appdata.userid);
  const logoutHandler = () =>
    dispatch(
      updateappstate({
        islogin: false,
        isdoctor: false,
      }),
    );
  return (
    <MenuProvider>
      <View style={{backgroundColor: 'white'}}>
        <Navbar
          title="Profile"
          endAdornment={
            <AboutMenuOptions
              onLogout={logoutHandler}
              setEditMode={() => setEditMode(true)}
            />
          }
        />
        <DoctorProfileWithId
          id={userId}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </View>
    </MenuProvider>
  );
}
export const DoctorProfile = (props: any) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <MenuProvider>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Navbar
          title="Doctor Details"
          endAdornment={
            <AboutMenuOptions setEditMode={() => setEditMode(true)} />
          }
        />
        <DoctorProfileWithId
          id={props.route.params?.id}
          clinic_id={props.route.params?.clinic_id}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </View>
    </MenuProvider>
  );
};
function DoctorProfileWithId({
  editMode,
  setEditMode,
  ...props
}: {
  id: string;
  clinic_id?: string;
  editMode: boolean;
  setEditMode: (p: boolean) => void;
}) {
  const navigation = useNavigation<any>();
  const [picmodalVisible, setpicModalVisible] = useState(false); // profile pic
  const {data: leaves} = useGetLeaves({doctor_id: props.id});
  const {data: availability, isLoading} = useGetAvailabilityQuery({
    doctor_id: props.id,
  });
  const {mutate: removeAvailability} = useRemoveAvailability();
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [section, setSection] = useState<'About' | 'Availability' | 'Leaves'>(
    'About',
  );
  const {data: doctorDetails} = useGetDoctor(props.id);
  const {mutate: updateDoctor} = useMutateDoctorProfile(props.id, () => {
    setEditMode(false);
  });
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

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

  function uploadprofilpicfun(data: VisibleDocument | undefined) {
    updateDoctor({
      profile_image_key: data?.fileKey,
    });
  }
  const navigateToAddAvailability = () => {
    navigation.navigate('Addavailability', {
      id: props.id,
      clinic_id: props.clinic_id,
    });
  };

  const navigateToLeaveAddPage = () => {
    navigation.navigate(AppPages.Leave, {
      id: props.id,
      clinic_id: props.clinic_id,
    });
  };

  const removeAvailabilityHandler = (item: AvailabilityFE) => {
    removeAvailability(item.entry_id);
  };

  return (
    <View style={style.container}>
      <View style={{flex: 1}}>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => setpicModalVisible(true)}>
            <Image
              style={style.image}
              source={{uri: doctorDetails?.profile_image}}
            />
          </TouchableOpacity>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={[commonStyles.font24, commonStyles.weight700]}>
              {doctorDetails?.name}
            </Text>
            <Text style={commonStyles.caption}>
              {doctorDetails?.speciality}
            </Text>
          </View>
        </View>
        <View style={style.tabContainer}>
          <TouchableOpacity
            style={[
              style.tabButton,
              {borderBottomWidth: !!(section == 'About') ? 1 : undefined},
            ]}
            onPress={() => setSection('About')}>
            <Text style={style.tabText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.tabButton,
              {
                borderBottomWidth: !!(section == 'Availability')
                  ? 1
                  : undefined,
              },
            ]}
            onPress={() => setSection('Availability')}>
            <Text style={style.tabText}>Availability</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.tabButton,
              {borderBottomWidth: !!(section == 'Leaves') ? 1 : undefined},
            ]}
            onPress={() => setSection('Leaves')}>
            <Text style={style.tabText}>Leaves</Text>
          </TouchableOpacity>
        </View>
        {section === 'About' && (
          <>
            <View style={style.contentContainer}>
              <DoctorProfileEntry
                label="Degree"
                value={doctorDetails?.degree}
              />
              <DoctorProfileEntry
                label="Consultation Fees"
                value={doctorDetails?.fees}
              />
              <DoctorProfileEntry
                label="Experience"
                value={`${doctorDetails?.experience ?? '- -'} Yrs`}
              />
              <DoctorProfileEntry
                label="Appointment Time"
                value={doctorDetails?.appointment_time}
              />
            </View>
            <View style={style.aboutContainer}>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                About
              </Text>
              <Text style={commonStyles.font16}>{doctorDetails?.about}</Text>
            </View>
          </>
        )}
        {section === 'Availability' && (
          <View style={[{flex: 1}, style.profileSection]}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[commonStyles.font16, commonStyles.weight600]}>
                Availability
              </Text>
              {!!availability?.length && (
                <Pressable
                  onPress={navigateToAddAvailability}
                  style={{alignItems: 'flex-end', marginRight: 30}}>
                  <Icon name="plus" size={24} color={Color.primary} />
                </Pressable>
              )}
            </View>
            {!availability?.length && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Btn
                  title="Add Availability"
                  onPress={navigateToAddAvailability}
                />
              </View>
            )}
            {!!availability?.length && (
              <SwipeListView
                data={availability}
                renderItem={(data, rowMap) => (
                  <AvailabilityCard availability={data.item} />
                )}
                renderHiddenItem={(data, rowMap) => (
                  <SwipeDeleteButton
                    onPress={removeAvailabilityHandler}
                    item={data.item}
                  />
                )}
                rightOpenValue={-75}
              />
            )}
          </View>
        )}
        {section === 'Leaves' && (
          <View style={[{flex: 1}, style.profileSection]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Leaves
              </Text>
              {!!leaves?.length && (
                <Pressable
                  onPress={navigateToLeaveAddPage}
                  style={{alignItems: 'flex-end', marginRight: 30}}>
                  <Icon name="plus" size={24} color={Color.primary} />
                </Pressable>
              )}
            </View>
            {!!leaves?.length && (
              <View>
                <ScrollView>
                  {leaves?.map(i => (
                    <LeaveCard details={i} />
                  ))}
                </ScrollView>
              </View>
            )}
            {!leaves?.length && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Btn title="Add Leave" onPress={navigateToLeaveAddPage} />
              </View>
            )}
          </View>
        )}
      </View>

      <Doctorprofilemodel
        editMode={editMode}
        setEditMode={setEditMode}
        doctorDetails={doctorDetails}
        onSubmit={updateProfileHandler}
      />
      <Profilepicuploadmodel
        modalVisible={picmodalVisible}
        setModalVisible={setpicModalVisible}
        onSubmit={uploadprofilpicfun}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 150,
    height: 150,
    width: 150,
  },
  bookingContainer: {
    flex: 2,
    marginTop: -50,
    marginHorizontal: 5,
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: Color.greybgc,
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    marginTop: 10,
  },
  aboutContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  profileSection: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  tabContainer: {flexDirection: 'row', gap: 20, justifyContent: 'center'},
  tabButton: {padding: 10, borderColor: Color.primary},
  tabText: {...commonStyles.caption},
});
