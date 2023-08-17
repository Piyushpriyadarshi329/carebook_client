import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Color from '../asset/Color';
import {useLogin} from '../customhook/useLogin';
import {updateappstate} from './../redux/reducer/Authreducer';
import {AuthStyles} from './authStyles';

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
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
            fontWeight: '700',
          }}>
          Welcome To Carebook
        </Text>

        <Text style={{color: 'gray', fontSize: 18, fontWeight: '500'}}>
          Signin to Continue
        </Text>
      </View>

      <View style={AuthStyles.loginContainer}>
        <View style={AuthStyles.authFieldRow}>
          <Icon name="mobile1" size={20} color="black" />
          <TextInput
            style={AuthStyles.textInput}
            placeholder="Email/Phone"
            keyboardType="default"
            onChangeText={text => {
              setemail(text);
            }}
          />
        </View>

        <View style={AuthStyles.authFieldRow}>
          <Icon name="key" size={20} color="black" />
          <TextInput
            style={AuthStyles.textInput}
            secureTextEntry
            placeholder="Password"
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
          <Button
            title={'Login'}
            onPress={submithandler}
            color={Color.primary}
          />
        </View>
      </View>

      <View style={{flex: 2}}></View>
    </View>
  );
}
