import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import {useSelector, useDispatch} from 'react-redux';
import {updateappstate} from './../redux/reducer/Authreducer';
import {useGetaddress} from '../customhook/useGetaddress';
import {RootState} from '../redux/Store';
import {useGetcliniclist} from '../customhook/useGetcliniclist';
import {useNavigation} from '@react-navigation/native';

export default function Clinicprofile() {
  const dispatch = useDispatch();
  const Appdata = useSelector((state: RootState) => state);
  const navigation = useNavigation();

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [addressdetails, setaddressdetails] = useState<any>({});
  const [profile, setprofile] = useState<any>({});

  useEffect(() => {
    getaddressfun();
    getprofilefun();
  }, []);

  async function getaddressfun() {
    try {
      let payload: {user_id: string | null} = {
        user_id: Appdata.Appdata.userid,
      };
      let addressres: any = await useGetaddress(payload);

      console.log('addressres', addressres.data);

      setaddressdetails(addressres.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getprofilefun() {
    try {
      let payload: {clinic_id: string | null} = {
        clinic_id: Appdata.Appdata.userid,
      };

      console.log('payload', payload);
      let profileresres: any = await useGetcliniclist(payload);

      console.log('profileresres', profileresres.data);

      setprofile(profileresres.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleNumberOfLines = () => {
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
              {profile?.name}
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', marginTop: 5}}>
              {addressdetails.address_line1} {addressdetails.address_line1}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>
              {' '}
              {addressdetails.city} {addressdetails.state}{' '}
              {addressdetails.pincode}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>consultation Fees:</Text>

            <Text style={{color: 'black', marginLeft: 10}}> ---------.</Text>
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
              source={require('./../asset/image/Clinic.jpeg')}
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
              {`..........................................................................................`}
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

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          <TouchableOpacity
            style={{
              backgroundColor: Color.primary,
              borderRadius: 5,
              marginLeft: 10,
            }}
            onPress={() => {
              navigation.navigate('Editprofile');
            }}>
            <Text style={{color: 'black', fontSize: 20, padding: 5}}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
