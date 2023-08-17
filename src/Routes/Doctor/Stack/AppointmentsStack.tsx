import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoggedInUserAppointments} from '../../../screen/Appointments';
import {LoggedInUserLeave} from '../../../screen/Leave';
import {AppPages} from '../../../appPages';

export default function Appointmentsstack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppPages.Appointments}
        component={LoggedInUserAppointments}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.Leave}
        component={LoggedInUserLeave}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
