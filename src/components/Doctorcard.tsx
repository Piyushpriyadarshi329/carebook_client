import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';

export default function Doctorcard({data}: any) {
  const navigation = useNavigation();
  const Appdata = useSelector((state: RootState) => state);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.tertiary,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 5,
      }}>
      <View style={{flex: 1}}>
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 50,
            marginVertical: 10,
            marginLeft: 10,
          }}
          source={require('./../asset/image/profile.png')}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'black'}}>{data.name}</Text>
        <Text style={{color: 'black'}}>Heart Specialist</Text>
        <Text style={{color: 'black'}}>{data.mobile}</Text>
        <Text style={{color: 'black'}}>{data.email}</Text>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'space-around',
        }}>
        <Icon
          name="user"
          style={{color: Color.primary, fontSize: 24}}
          onPress={() => {
            navigation.navigate('DoctorProfile', {
              id: data.id,
              clinic_id: Appdata.Appdata.userid,
            });
          }}
        />
        <IonIcon
          name="exit-outline"
          style={{color: Color.primary, fontSize: 24}}
          onPress={() => {
            navigation.navigate('Leave', {
              id: data.id,
              clinic_id: Appdata.Appdata.userid,
            });
          }}
        />
      </View>
    </View>
  );
}
