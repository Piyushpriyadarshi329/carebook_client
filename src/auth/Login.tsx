import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, View} from 'react-native';
import {Button, Text, Icon} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import Color from '../asset/Color';
import {commonStyles} from '../asset/styles';
import {RHFTextInput} from '../components/RHFInputs/RHFTextInput';
import {useLoginQuery} from '../customhook/useLogin';
import {validateEmailOrPhone} from '../utils/validations';
import {updateappstate} from './../redux/reducer/Authreducer';
import {AuthStyles} from './authStyles';

interface LoginForm {
  username: string;
  password: string;
}
export default function Login() {
  const dispatch = useDispatch();
  const formMethods = useForm<LoginForm>({mode: 'onSubmit'});
  const [fcm_token, setfcm_token] = useState('');
  useEffect(() => {
    checkToken();
  });
  const {mutate, isLoading} = useLoginQuery({
    onSuccess: (data: any) => {
      dispatch(
        updateappstate({
          islogin: true,
          isdoctor: data?.usertype == 2 ? true : false,
          isclinic: data?.usertype == 3 ? true : false,
          userid: data?.id,
          username: data?.name,
        }),
      );
    },
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
    console.log('clicked');

    let payload = {
      userName: formValues.username,
      password: formValues.password,
      userType: 2,
      fcm_token: fcm_token,
    };

    mutate(payload);
  }
  const [showPW, setShowPW] = useState(false);

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
            <Icon name="account" size={20} color="black" />
            <RHFTextInput
              name="username"
              placeholder="Email/Phone"
              keyboardType="default"
              required
              rules={{validate: validateEmailOrPhone}}
            />
          </View>

          <View style={commonStyles.flexRowAlignCenter}>
            <Icon name="key-variant" size={20} color="black" />
            <RHFTextInput
              name="password"
              secureTextEntry={!showPW}
              placeholder="Password"
              required
              rightIcon={
                <Icon
                  name={showPW ? 'eye' : 'eye-off'}
                  color={'#95e8ff'}
                  style={{fontSize: 20, padding: 5}}
                  onPressIn={() => {
                    setShowPW(true);
                  }}
                  onPressOut={() => {
                    setShowPW(false);
                  }}
                />
              }
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Button
              title={'Login'}
              onPress={
                !isLoading ? formMethods.handleSubmit(submithandler) : () => {}
              }
              loading={isLoading}
              containerStyle={{
                width: '50%',
              }}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
}
