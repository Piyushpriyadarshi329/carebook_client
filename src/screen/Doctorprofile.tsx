import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../asset/Color';
import Navbar from '../components/Navbar';
import {RHFTextInput} from '../components/RHFInputs/RHFTextInput';
import {useGetLeaves} from '../customhook/useGetLeaves';
import {useGetavailability} from '../customhook/useGetavailability';
import type {RootState} from '../redux/Store';
import {updateappstate} from '../redux/reducer/Authreducer';
import {useGetDoctor, useMutateDoctorProfile} from './useDoctorQuery';
import {AppPages} from '../appPages';
import {usegetBookingsSummary} from '../customhook/usegetBookingsSummary';
import {Doctorprofilemodel} from '../components/Doctorprofilemodel';
import AvailabilityCard from '../components/AvailabilityCard';
import EditButton from '../components/EditButton';
import DoctorProfileEntry from './DoctorProfileEntry';
import Btn from '../components/Btn';
import PopupMenu from '../components/PopupMenu';

export interface ProfileForm {
  username: string;
  about: string;
  consultationTime: string;
  fees: string;
}
export default function LoggedInDoctorProfile() {
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.Appdata.userid);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <DoctorProfileWithId id={userId} />
      <View style={{flex: 0.1, alignItems: 'center', marginTop: 10}}>
        <Button
          title="Log out"
          color={Color.red}
          onPress={() =>
            dispatch(
              updateappstate({
                islogin: false,
                isdoctor: false,
              }),
            )
          }
        />
      </View>
    </View>
  );
}
export const DoctorProfile = (props: any) => {
  return (
    <DoctorProfileWithId
      id={props.route.params?.id}
      clinic_id={props.route.params?.clinic_id}
    />
  );
};
function DoctorProfileWithId(props: {id: string; clinic_id?: string}) {
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(false);
  const {data: doctorDetails} = useGetDoctor(props.id);

  console.log('doctorDetails1111==>', doctorDetails);

  const {mutate: updateDoctor} = useMutateDoctorProfile(props.id, () => {
    setEditMode(false);
  });

  const {data: leaves} = useGetLeaves({doctor_id: props.id});
  const {data: Availability} = useGetavailability({doctor_id: props.id});

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  const updateProfileHandler = (formValues: ProfileForm) => {
    console.log('formValues', formValues);
    updateDoctor({
      name: formValues.username,
      appointment_time: Number(formValues.consultationTime),
      fees: Number(formValues.fees),
      about: formValues.about,
    });
  };

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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Doctorprofilemodel
        editMode={editMode}
        setEditMode={setEditMode}
        doctorDetails={doctorDetails?.length ? doctorDetails[0] : undefined}
        onSubmit={updateProfileHandler}
      />
      <Navbar title="Profile" />
      <View style={[{flex: 4}, style.profileSection]}>
        <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 20}}>
          <View style={{flex: 2, marginTop: 10}}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                Dr. {doctorDetails?.[0]?.name ?? 'Name - -'}
              </Text>
              <EditButton onPress={() => setEditMode(true)} />
            </View>
            <DoctorProfileEntry
              label="Consultation Time"
              value={doctorDetails?.[0]?.appointment_time?.toString()}
            />
            <DoctorProfileEntry
              label="Consultation Fees"
              value={doctorDetails?.[0]?.fees?.toString()}
            />
            <DoctorProfileEntry
              label="Speciality"
              value={doctorDetails?.[0]?.speciality?.toString()}
            />
          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginTop: 10,
                }}
                source={require('./../asset/image/profile.png')}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: textShown ? 2.5 : 1.5,
            marginHorizontal: 20,
            marginTop: 20,
          }}>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              About
            </Text>
          </View>

          <View>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{lineHeight: 21, color: 'black'}}>
              {doctorDetails?.[0]?.about ?? '- -'}
            </Text>

            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 4,
                  color: 'black',
                  fontWeight: '700',
                }}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'column', flex: 8}}>
        <View style={[{flex: 1}, style.profileSection]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Availablity
            </Text>
            {!!Availability?.length && (
              <Pressable
                onPress={navigateToAddAvailability}
                style={{flex: 1, alignItems: 'flex-end', marginRight: 30}}>
                <Icon name="plus" size={24} color={Color.primary} />
              </Pressable>
            )}
          </View>
          {!Availability?.length && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Btn
                title="Add Availability"
                onPress={navigateToAddAvailability}
              />
            </View>
          )}
          <ScrollView>
            <View style={{flex: 10}}>
              {Availability?.map(a => {
                return <AvailabilityCard availability={a} />;
              })}
            </View>
          </ScrollView>
        </View>

        <View style={[{flex: 1}, style.profileSection]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Leaves
            </Text>
            {!!leaves?.length && (
              <Pressable
                onPress={navigateToLeaveAddPage}
                style={{flex: 1, alignItems: 'flex-end', marginRight: 30}}>
                <Icon name="plus" size={24} color={Color.primary} />
              </Pressable>
            )}
          </View>
          {!!leaves?.length && (
            <View style={{flex: 10}}>
              <ScrollView>
                {leaves?.map((i: any) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        backgroundColor: Color.primary,
                        borderRadius: 5,
                      }}>
                      <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={{padding: 5, color: 'black'}}>
                          To date:{' '}
                          {new Date(Number(i.todate))
                            .toISOString()
                            .substring(0, 10)}
                        </Text>
                        <Text style={{padding: 5, color: 'black'}}>
                          From date:{' '}
                          {new Date(Number(i.fromdate))
                            .toISOString()
                            .substring(0, 10)}
                        </Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{padding: 5, color: 'black'}}>
                          Reason: {i.reason}
                        </Text>
                        <Text style={{padding: 5, color: 'black'}}>
                          {i.fullday ? 'fullday' : null}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
          {!leaves?.length && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Btn title="Add Leave" onPress={navigateToLeaveAddPage} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  profileSection: {
    backgroundColor: Color.tertiary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 3,
    marginHorizontal: 20,
  },
});
