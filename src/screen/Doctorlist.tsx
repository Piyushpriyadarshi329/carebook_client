import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../asset/Color';
import Doctorcard from '../components/Doctorcard';
import {useNavigation} from '@react-navigation/native';


export default function Doctorlist() {
  const navigation = useNavigation();

  const [doctorlist, setdoctorlist] = useState<any>([]);


  useEffect(() => {
    setdoctorlist([{}, {}, {}, {}, {}]);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          marginTop: 10,
          marginHorizontal: 20,
          // backgroundColor:"red"
        }}>
        <Icon name={'chevron-back-sharp'} color={Color.primary} size={24} />
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 10,
          }}>
          Doctor Listt
        </Text>
      </View>
      <View style={{flex: 10}}>


        <View style={{flex: 1,alignItems:"flex-end",marginRight:20}}>

          <TouchableOpacity
          onPress={()=>{

navigation.navigate('Adddoctor')

          }}
          >


        <Icon name="add-circle" color={Color.primary} size={35} />
          </TouchableOpacity>


        </View>

        <View style={{flex:20}}>
          <ScrollView>
            {doctorlist.map((i:any)=> {
              return (
                <View style={{flex: 1}}>
                  <Doctorcard />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
