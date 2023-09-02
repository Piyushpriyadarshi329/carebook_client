import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {AppPages} from '../../../Routes/appPages';
import Color from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import Btn from '../../../components/Btn';
import {DoctorProfileModal} from './Edit/Modal';
import Navbar from '../../../components/Navbar';
import Profilepicuploadmodel from '../../../components/Profilepicuploadmodel';
import SwipeDeleteButton from '../../../components/SwipeDeleteButton';
import type {RootState} from '../../../redux/Store';
import {updateappstate} from '../../../redux/reducer/Authreducer';
import {LeaveDto, VisibleDocument} from '../../../types';
import AvailabilityCard from './AvailabilityCard';

import {MenuProvider} from 'react-native-popup-menu';
import ConformationModel from '../../../components/ConformationModel';
import {useAlert} from '../../../utils/useShowAlert';
import {
  AvailabilityFE,
  useGetAvailabilityQuery,
  useRemoveAvailability,
} from '../../Availability/useGetAvailability';
import AboutMenuOptions from '../../Clinic/Profile/MenuOptions';
import DoctorProfileEntry from '../../DoctorProfileEntry';
import {useGetDoctor, useMutateDoctorProfile} from '../../useDoctorQuery';
import {useGetLeaves, useRemoveLeave} from '../Leave/useLeaveQuery';
import LeaveCard from './LeaveCard';
import {getToday} from '../../../utils/dateMethods';

export interface ProfileForm {
  username: string;
  about: string;
  consultationTime: string;
  fees: string;
  experience: string;
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
  const navigation = useNavigation<any>();
  return (
    <MenuProvider>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Navbar
          title="Doctor Details"
          onBack={() => {
            navigation.navigate(AppPages.DoctorList);
          }}
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
  const {successAlert} = useAlert();
  const [picmodalVisible, setpicModalVisible] = useState(false); // profile pic
  const [availabilitymodalVisible, setavailabilityModalVisible] =
    useState(false);
  const [leaveDeleteModalVisible, setLeaveDeleteModalVisible] = useState(false);

  const [deleteavailability, setdeleteavailability] =
    useState<AvailabilityFE | null>();
  const [deleteLeave, setDeleteLeave] = useState<LeaveDto | null>();

  const {data: leaves} = useGetLeaves({
    doctor_id: props.id,
    clinic_id: props.clinic_id,
    fromDate: getToday().getTime(),
  });
  const {data: availability, isLoading} = useGetAvailabilityQuery({
    doctor_id: props.id,
    clinic_id: props.clinic_id,
  });
  const {mutate: removeAvailability} = useRemoveAvailability(() =>
    successAlert('Removed Availability.'),
  );
  const {mutate: removeLeave} = useRemoveLeave({
    onSuccess: () => successAlert('Removed Leave.'),
  });
  const [section, setSection] = useState<'About' | 'Availability' | 'Leaves'>(
    'About',
  );
  const {data: doctorDetails} = useGetDoctor({
    id: props.id,
    clinic_id: props.clinic_id,
  });
  const {mutate: updateDoctor} = useMutateDoctorProfile(props.id, () => {
    setEditMode(false);
  });

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

  function removeAvailabilityfun(item: AvailabilityFE) {
    setdeleteavailability(item);

    setavailabilityModalVisible(true);
  }
  function removeLeavefun(item: LeaveDto) {
    setDeleteLeave(item);

    setLeaveDeleteModalVisible(true);
  }

  const removeAvailabilityHandler = () => {
    removeAvailability(deleteavailability?.entry_id ?? '');
    setavailabilityModalVisible(false);
  };
  const removeLeaveHandler = () => {
    removeLeave(deleteLeave?.id ?? '');
    setLeaveDeleteModalVisible(false);
  };

  return (
    <View style={style.container}>
      <View style={{flex: 1}}>
        <View style={style.imageContainer}>
          <TouchableOpacity onPress={() => setpicModalVisible(true)}>
            <Image
              style={style.image}
              source={
                doctorDetails?.profile_image
                  ? {uri: doctorDetails?.profile_image}
                  : require('../../../asset/image/doctor.png')
              }
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[commonStyles.font16, commonStyles.weight600]}>
                Availability
              </Text>
              {!!availability?.length && (
                <Pressable
                  onPress={navigateToAddAvailability}
                  style={{marginRight: 30}}>
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
                contentContainerStyle={{gap: 10}}
                renderItem={(data, rowMap) => (
                  <AvailabilityCard availability={data.item} />
                )}
                renderHiddenItem={(data, rowMap) => (
                  <SwipeDeleteButton
                    onPress={removeAvailabilityfun}
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
                  style={{marginRight: 30}}>
                  <Icon name="plus" size={24} color={Color.primary} />
                </Pressable>
              )}
            </View>
            {!!leaves?.length && (
              <SwipeListView
                data={leaves}
                contentContainerStyle={{gap: 10}}
                renderItem={(data, rowMap) => <LeaveCard details={data.item} />}
                renderHiddenItem={(data, rowMap) => (
                  <SwipeDeleteButton
                    onPress={removeLeavefun}
                    item={data.item}
                  />
                )}
                rightOpenValue={-75}
              />
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
      <ConformationModel
        title="Delete Availability?"
        subtitle="Do you want to Delete Availability?"
        modalVisible={availabilitymodalVisible}
        setModalVisible={setavailabilityModalVisible}
        onsubmit={removeAvailabilityHandler}
      />
      <ConformationModel
        title="Delete Leave?"
        subtitle="Do you want to Delete this Leave?"
        modalVisible={leaveDeleteModalVisible}
        setModalVisible={setLeaveDeleteModalVisible}
        onsubmit={removeLeaveHandler}
      />
      <DoctorProfileModal
        editMode={editMode}
        setEditMode={setEditMode}
        doctorDetails={doctorDetails}
        clinic_id={props.clinic_id}
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
