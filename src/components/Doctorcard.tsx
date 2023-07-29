import {View, Text, Image} from 'react-native';
import React from 'react';
import Color from '../asset/Color';

export default function Doctorcard({data}:any) {


  console.log("data",data)
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Color.primary,
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
            marginTop: 10,
            marginLeft: 10,
          }}
          source={require('./../asset/image/profile.png')}
        />
      </View>

      <View style={{flex: 1,justifyContent:"center"}}>
        <Text style={{color:"black"}}>{data.name}</Text>
        <Text style={{color:"black"}}>Heart Specialist</Text>
        <Text style={{color:"black"}}>{data.mobile}</Text>
        <Text style={{color:"black"}}>{data.email}</Text>
      </View>
    </View>
  );
}
