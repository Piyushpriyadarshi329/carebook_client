import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import {useSelector, useDispatch} from 'react-redux';
import {updateappstate} from '../redux/reducer/Authreducer';
import type {RootState} from '../redux/Store';
import {useNavigation} from '@react-navigation/native';
import {useGetavailability} from '../customhook/useGetavailability';
import {useGetLeaves} from '../customhook/useGetLeaves';

export default function Doctorprofile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const Appdata = useSelector((state: RootState) => state);
  const [Availability, setAvailability] = useState([]);

  const [leaves, setleaves] = useState([]);
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
    getleaves();
  }, []);

  async function getdoctoravailability() {
    try {
      let payload: any = {
        doctor_id: Appdata.Appdata.userid,
      };

      console.log('payload', payload);

      let res: any = await useGetavailability(payload);

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

  async function getleaves() {
    try {
      let payload: {
        doctor_id: string;
      } = {
        doctor_id: Appdata.Appdata.userid,
      };

      console.log('payload getleaves', payload);

      let getleaveres: any = await useGetLeaves(payload);

      console.log('getleaveres', getleaveres.data);
      setleaves(getleaveres.data.data);
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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 2, marginTop: 30}}>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Dr. {Appdata.Appdata.username}
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', marginTop: 5}}>_____________</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>consultation Time:</Text>
            <Text style={{color: 'black', marginLeft: 10}}> ___________</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>consultation Fees:</Text>

            <Text style={{color: 'black', marginLeft: 10}}>___________.</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
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

      <View style={{flexDirection: 'column', flex: 8}}>
        <View style={{flex: textShown ? 2.5 : 1.5, marginHorizontal: 20}}>
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
              {`..........................................`}
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
        <View style={{flex: 3, marginHorizontal: 20}}>
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
            {Availability.map((i: any) => {
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
                      {i.clinic_name}
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
        </View>

        <View style={{flex: 3, marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Leaves
            </Text>
          </View>

          {/* [{"active": 1, "created_datetime": "1691349426749", "doctor_id": "437f34af-723a-41e8-aee1-014ce2d97f0a", "fromdate": "1692835200000", "fullday": 0, "id": "0dc9aba9-260f-42b3-a6c5-ce2a7e1f4f7e", "reason": "Test", "todate": "1692662400000", "worktime_id": "5d7ec9cd-fb88-4570-865f-62c6d557446d"}, {"active": 1, "created_datetime": "1691347933499", "doctor_id": "437f34af-723a-41e8-aee1-014ce2d97f0a", "fromdate": "1693440000000", "fullday": 1, "id": "331f0cf8-ea3a-4fbf-8a42-cf6a645b4df6", "reason": "Test ", "todate": "1692748800000", "worktime_id": ""}] */}

          <View style={{flex: 10}}>
            {leaves.map((i: any) => {
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
          </View>
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
  );
}
