import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Color from '../asset/Color';
import {useLogin} from '../customhook/useLogin';
import {updateappstate} from './../redux/reducer/Authreducer';
import {AuthStyles} from './authStyles';
import {useAlert} from '../utils/useShowAlert';
import {Image} from 'react-native';
import Btn from '../components/Btn';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {errorAlert} = useAlert();
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
        errorAlert(data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Image
          style={{height: 200, width: 300, resizeMode: 'contain'}}
          source={require('./../asset/image/CAREBOOK.jpg.png')}
        />

        <View style={AuthStyles.authFieldRow}>
          <Text style={AuthStyles.text}>Login</Text>
        </View>
      </View>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
          marginVertical: 40,
        }}>
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
      </View> */}

      <View style={AuthStyles.loginContainer}>
        <View style={AuthStyles.authFieldRow}>
          <Icon name="user" size={20} color="black" />
          <TextInput
            style={AuthStyles.textInput}
            placeholder="Email/Phone"
            keyboardType="default"
            onChangeText={text => {
              setemail(text);
            }}
            placeholderTextColor={'black'}
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
            placeholderTextColor={'black'}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Btn title={'Login'} onPress={submithandler} />
        </View>
      </View>
    </View>
  );
}
