import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import {useSelector, useDispatch} from 'react-redux';
import {updateappstate} from '../redux/reducer/Authreducer';
import type {RootState} from '../redux/Store';
import {useNavigation} from '@react-navigation/native';
import {useGetavailability} from '../customhook/useGetavailability';
import {useForm, FormProvider} from 'react-hook-form';
import {RHFTextInput} from '../components/RHFTextInput';
import {useGetDoctor, useMutateDoctorProfile} from './useDoctorQuery';

interface ProfileForm {
  username: string;
  about: string;
  consultationTime: string;
  fees: string;
}
export default function Doctorprofile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const Appdata = useSelector((state: RootState) => state);
  const [Availability, setAvailability] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const {data: doctorDetails} = useGetDoctor(Appdata.Appdata.userid, data => {
    formMethods.setValue('about', data?.[0]?.about ?? '');
    formMethods.setValue(
      'consultationTime',
      data?.[0]?.appointment_time?.toString() ?? '',
    );
    formMethods.setValue('fees', data?.[0]?.fees?.toString() ?? '');
  });
  const formMethods = useForm<ProfileForm>({
    defaultValues: {
      about: doctorDetails?.[0]?.about,
      consultationTime: doctorDetails?.[0]?.appointment_time?.toString(),
      fees: doctorDetails?.[0]?.fees?.toString(),
      username: Appdata.Appdata.username ?? '',
    },
  });
  const {mutate: updateDoctor} = useMutateDoctorProfile(
    Appdata.Appdata.userid,
    () => {
      setEditMode(false);
    },
  );
  const days = [
    {
      value: 0,
      label: 'SUN',
    },
    {
      value: 1,
      label: 'MON',
    },
    {
      value: 2,
      label: 'TUE',
    },
    {
      value: 3,
      label: 'WED',
    },
    {
      value: 4,
      label: 'THU',
    },
    {
      value: 5,
      label: 'FRI',
    },
    {
      value: 6,
      label: 'SAT',
    },
  ];

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  useEffect(() => {
    getdoctoravailability();
  }, []);

  async function getdoctoravailability() {
    try {
      let payload: any = {
        doctor_id: Appdata.Appdata.userid,
      };

      console.log('payload', payload);

      let res: any = await useGetavailability(payload);

      console.log('res', res.data.data);

      let newdata: any = [];

      res.data.data.map((i: any) => {
        let local = newdata.filter((j: any) => j.entry_id == i.entry_id);

        if (local.length > 0) {
          // console.log("local.length",local.length)

          // console.log("index",newdata.indexOf(i))
          newdata = newdata.map((k: any) => {
            if (k.entry_id == i.entry_id) {
              return {
                ...k,
                week_day: k.week_day + ',' + days[i.week_day].label,
              };
            } else {
              return k;
            }
          });
        } else {
          newdata.push({...i, week_day: days[i.week_day].label});
        }
      });

      setAvailability(newdata);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const updateProfileHandler = (formValues: ProfileForm) => {
    console.log(formValues);
    updateDoctor({
      name: formValues.username,
      // speciality: '',
      // degree: '',
      appointment_time: Number(formValues.consultationTime),
      fees: Number(formValues.fees),
      about: formValues.about,
    });
  };
  console.log('doctorDetails: ', doctorDetails);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FormProvider {...formMethods}>
        <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 20}}>
          <View style={{flex: 2, marginTop: 30}}>
            <View>
              {editMode ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'black'}}>Name: </Text>
                  <RHFTextInput
                    name="username"
                    placeHolder="Name"
                    styles={{width: '60%'}}
                  />
                </View>
              ) : (
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  Dr. {Appdata.Appdata.username}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>consultation Time:</Text>
              {editMode ? (
                <RHFTextInput
                  name="consultationTime"
                  styles={{width: '50%', marginLeft: 10}}
                />
              ) : (
                <Text style={{color: 'black', marginLeft: 10}}>
                  {doctorDetails?.[0]?.appointment_time?.toString()}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>consultation Fees:</Text>
              {editMode ? (
                <RHFTextInput
                  name="fees"
                  styles={{width: '50%', marginLeft: 10}}
                />
              ) : (
                <Text style={{color: 'black', marginLeft: 10}}>
                  {doctorDetails?.[0]?.fees?.toString()}
                </Text>
              )}
            </View>
          </View>
          <View style={{flex: 1, marginTop: 10}}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              {editMode ? (
                <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
                  <Icon
                    name={'cross'}
                    style={{color: Color.primary, fontSize: 20}}
                    onPress={() => {
                      setEditMode(false);
                    }}
                  />
                  <Icon
                    name={'check'}
                    style={{color: Color.primary, fontSize: 20}}
                    onPress={() => {
                      formMethods.handleSubmit(updateProfileHandler)();
                    }}
                  />
                </View>
              ) : (
                <Icon
                  name="edit"
                  style={{color: Color.primary, fontSize: 20}}
                  onPress={() => {
                    setEditMode(true);
                  }}
                />
              )}
            </View>
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
          {editMode ? (
            <RHFTextInput name="about" />
          ) : (
            <View>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 2}
                style={{lineHeight: 21, color: 'black'}}>
                {doctorDetails?.[0]?.about}
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
          )}
        </View>
      </FormProvider>

      <View style={{flexDirection: 'column', flex: 8}}>
        <View style={{flex: textShown ? 5 : 6, marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Availablity
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Addavailability');
              }}
              style={{flex: 1, alignItems: 'flex-end', marginRight: 30}}>
              <Icon name="plus" size={30} color={Color.primary} />
            </Pressable>
          </View>

          <View style={{flex: 10}}>
            {Availability.map(i => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    backgroundColor: Color.primary,
                    borderRadius: 5,
                  }}>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <Text
                      style={{textAlign: 'left', padding: 5, color: 'black'}}>
                      Clinic 1
                    </Text>
                    <Text style={{padding: 5, color: 'black'}}>
                      Slots: {i.no_of_slot}
                    </Text>
                  </View>
                  <View style={{flex: 2, alignItems: 'center'}}>
                    <Text style={{padding: 5, color: 'black'}}>
                      {i.week_day}
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{padding: 5, color: 'black'}}>
                      {i.from_time}
                    </Text>
                    <Text style={{padding: 5, color: 'black'}}>
                      {i.to_time}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              style={{backgroundColor: Color.primary, borderRadius: 5}}
              onPress={() => {
                dispatch(
                  updateappstate({
                    islogin: false,
                    isdoctor: false,
                  }),
                );
              }}>
              <Text style={{color: 'black', fontSize: 20, padding: 5}}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
