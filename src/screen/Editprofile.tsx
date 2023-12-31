import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import type {RootState} from '../redux/Store';
import {AddAdressRequest} from '../types';
import {useAddaddressMutation} from './Clinic/Profile/useAddaddress';

export default function Editprofile() {
  const userId = useSelector((state: RootState) => state.Appdata.userid);

  const [address_line1, setaddress_line1] = useState('');
  const [address_line2, setaddress_line2] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');

  async function submithandler() {
    try {
      let payload: AddAdressRequest = {
        address_line1: address_line1,
        address_line2: address_line2,
        city: city,
        state: state,
        user_id: userId ?? '',
        pincode: Number(pincode),
        lat: 0,
        lan: 0,
      };

      let res: any = await useAddaddressMutation(payload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}></View>
      <View style={{flex: 3, justifyContent: 'center'}}></View>
      <View style={{flex: 0.7, marginLeft: 50}}>
        <Text style={{color: Color.black, fontSize: 22, fontWeight: 'bold'}}>
          Fill Clinic Details
        </Text>
      </View>

      <View style={{flex: 1, marginLeft: 50}}></View>

      <View style={{flex: 6}}>
        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <Icon name="user" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              marginLeft: 10,
              height: 40,
              flex: 1,
              color: 'black',
            }}
            placeholder="Address Line 1."
            onChangeText={text => {
              setaddress_line1(text);
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <Icon name="user" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              marginLeft: 10,
              height: 40,
              flex: 1,
              color: 'black',
            }}
            placeholder="Address Line 2."
            onChangeText={text => {
              setaddress_line2(text);
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <Icon name="mobile1" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              height: 40,
              marginLeft: 10,
              flex: 1,
              color: 'black',
            }}
            placeholder="Please enter city."
            keyboardType="default"
            onChangeText={text => {
              setcity(text);
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <MaterialIcon name="email" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              height: 40,
              marginLeft: 10,
              flex: 1,
              color: 'black',
            }}
            placeholder="Please enter State"
            onChangeText={text => {
              setstate(text);
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 10}}>
            <FontAwesome5 name="lock" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              height: 40,
              marginLeft: 10,
              flex: 1,
              color: 'black',
            }}
            placeholder="Please enter Pincode"
            onChangeText={text => {
              setpincode(text);
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{backgroundColor: Color.primary, borderRadius: 5}}
            onPress={submithandler}>
            <Text style={{fontSize: 20, color: 'white', padding: 10}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: 'flex-end',
          marginBottom: 30,
          alignItems: 'center',
        }}></View>
    </View>
  );
}
