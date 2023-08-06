import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doctorlist from '../../screen/Doctorlist';
import Adddoctor from '../../screen/Adddoctor';
import Profile from '../../screen/Doctorprofile';
import Addavailability from '../../screen/Addavailability';
import Clinicprofile from '../../screen/Clinicprofile';
import Editprofile from '../../screen/Editprofile';
import {useNavigation} from '@react-navigation/native';
import Appointments from '../../screen/Appointments';
import Leave from '../../screen/Leave';

export default function Appointmentsstack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Appointments"
        component={Appointments}
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
