import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doctorlist from '../../screen/Doctorlist';
import Adddoctor from '../../screen/Adddoctor';
import {DoctorProfile} from '../../screen/Doctorprofile';
import {DoctorAvaiability} from '../../screen/Addavailability';
import Leave from '../../screen/Leave';

export default function Clinicdoctorliststack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Doctorlist"
        component={Doctorlist}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Adddoctor"
        component={Adddoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Addavailability"
        component={DoctorAvaiability}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Leave"
        component={Leave}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
