import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, View} from 'react-native';
import {Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Color from '../asset/Color';
import {commonStyles} from '../asset/styles';
import Btn from '../components/Btn';
import {RHFTextInput} from '../components/RHFInputs/RHFTextInput';
import {useLogin} from '../customhook/useLogin';
import {useAlert} from '../utils/useShowAlert';
import {validateEmailOrPhone} from '../utils/validations';
import {updateappstate} from './../redux/reducer/Authreducer';
import {AuthStyles} from './authStyles';

interface LoginForm {
  username: string;
  password: string;
}
export default function Login() {
  const dispatch = useDispatch();
  const {errorAlert} = useAlert();
  const formMethods = useForm<LoginForm>({mode: 'onSubmit'});
  const [fcm_token, setfcm_token] = useState('');
  useEffect(() => {
    checkToken();
  });

  const checkToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
        setfcm_token(fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function submithandler(formValues: LoginForm) {
    try {
      let payload = {
        userName: formValues.username,
        password: formValues.password,
        userType: 2,
        fcm_token: fcm_token,
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
          source={require('./../asset/image/logo.jpeg')}
        />

        <View style={AuthStyles.authFieldRow}>
          <Text
            style={[
              AuthStyles.text,
              {fontSize: 20, fontWeight: '600', color: Color.primary},
            ]}>
            Login
          </Text>
        </View>
      </View>
      <FormProvider {...formMethods}>
        <View style={AuthStyles.loginContainer}>
          <View style={commonStyles.flexRowAlignCenter}>
            <Icon name="user" size={20} color="black" />
            <RHFTextInput
              name="username"
              placeholder="Email/Phone"
              keyboardType="default"
              required
              rules={{validate: validateEmailOrPhone}}
            />
          </View>

          <View style={commonStyles.flexRowAlignCenter}>
            <Icon name="key" size={20} color="black" />
            <RHFTextInput
              name="password"
              secureTextEntry
              placeholder="Password"
              keyboardType="default"
              required
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Btn
              title={'Login'}
              onPress={formMethods.handleSubmit(submithandler)}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
}
