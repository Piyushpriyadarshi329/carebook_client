import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Login() {
  const navigation = useNavigation();

  const [mobile, setmobile] = useState('');

  async function submithandler() {
    try {
      let payload = {
        mobile: mobile,
      };

      navigation.navigate('OTP');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
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
          Login
        </Text>
      </View>

      <View style={{flex: 0.7, marginLeft: 50}}>
        <Text style={{color: 'gray', fontSize: 18, fontWeight: '500'}}>
          Please Signin to Continue
        </Text>
      </View>

      <View style={{flex: 1, marginLeft: 50}}></View>

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
            style={{borderBottomWidth: 1, borderRadius: 5,marginLeft:10,flex:1,height:40}}
            placeholder="please enter Mobile No."
            keyboardType="numeric"
            onChangeText={text => {
              setmobile(text);
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
              Get OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 6,
          justifyContent: 'flex-end',
          marginBottom: 30,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: Color.black}}>Don't have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={{color: Color.primary, marginLeft: 5}}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
