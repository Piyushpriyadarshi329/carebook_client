import { View, Text } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Doctorlist from '../../screen/Doctorlist';
import Adddoctor from '../../screen/Adddoctor';
import Profile from '../../screen/Doctorprofile';
import Addavailability from '../../screen/Addavailability';


export default function DoctorProfilestack() {

    const Stack = createNativeStackNavigator();



  return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
        <Stack.Screen name="Addavailability" component={Addavailability} options={{headerShown:false}} />
      </Stack.Navigator>
  )
}