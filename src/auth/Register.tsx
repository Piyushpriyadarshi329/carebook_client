import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import type {RootState} from '../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import {updateappstate} from './../redux/reducer/Authreducer';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');

  async function submithandler() {
    try {
      let payload: {mobile: number} = {
        mobile: Number(mobile),
      };

      dispatch(
        updateappstate({
          islogin: true,
        }),
      );

      //   navigation.navigate('OTP');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 2}}></View>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
            fontWeight: '700',
          }}>
          Welcome To Carebook
        </Text>
      </View>
      <View style={{flex: 0.7, marginLeft: 50}}>
        <Text style={{color: Color.black, fontSize: 22, fontWeight: 'bold'}}>
          Create Account
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
            }}
            placeholder="Please enter Full Name."
            onChangeText={text => {
              setname(text);
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
            }}
            placeholder="Please enter Mobile No."
            keyboardType="numeric"
            onChangeText={text => {
              setmobile(text);
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
            }}
            placeholder="Please enter Email"
            keyboardType="numeric"
            onChangeText={text => {
              setemail(text);
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
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: Color.black}}>Already have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: Color.primary, marginLeft: 5}}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
