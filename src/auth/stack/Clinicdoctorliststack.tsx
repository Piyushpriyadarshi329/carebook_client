import { View, Text } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Doctorlist from '../../screen/Doctorlist';
import Adddoctor from '../../screen/Adddoctor';


export default function Clinicdoctorliststack() {

    const Stack = createNativeStackNavigator();



  return (
      <Stack.Navigator>
        <Stack.Screen name="Doctorlist" component={Doctorlist} options={{headerShown:false}} />
        <Stack.Screen name="Adddoctor" component={Adddoctor} options={{headerShown:false}} />
      </Stack.Navigator>
  )
}