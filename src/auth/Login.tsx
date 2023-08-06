import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useLogin} from '../customhook/useLogin';
import {updateappstate} from './../redux/reducer/Authreducer';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  async function submithandler() {
    try {
      let payload: any = {
        email: email,
        password: password,
        userType: 2,
      };

      let {data}: any = await useLogin(payload);

      if (data.Success) {
        dispatch(
          updateappstate({
            islogin: true,
            isdoctor: data.data.usertype == 2 ? true : false,
            isclinic: data.data.usertype == 3 ? true : false,
            userid: data.data.id,
            username: data.data.name,
          }),
        );
      } else {
        alert(data.Message);
      }

      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}></View>
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
          Login
        </Text>
      </View>

      <View style={{flex: 0.7, marginLeft: 50}}>
        <Text style={{color: 'gray', fontSize: 18, fontWeight: '500'}}>
          Please Signin to Continue
        </Text>
      </View>

      <View style={{flex: 4}}>
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
              marginLeft: 10,
              flex: 1,
              height: 50,
            }}
            placeholder="Please Enter Email."
            keyboardType="default"
            onChangeText={text => {
              setemail(text);
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 70,
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View style={{marginTop: 10}}>
            <Icon name="mobile1" size={20} color="black" />
          </View>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              marginLeft: 10,
              flex: 1,
              height: 40,
            }}
            placeholder="Please Enter Password."
            keyboardType="default"
            onChangeText={text => {
              setpassword(text);
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Color.primary,
              borderRadius: 5,
              height: 40,
            }}
            onPress={submithandler}>
            <Text style={{fontSize: 20, color: 'white', padding: 10}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 2}}></View>
    </View>
  );
}
