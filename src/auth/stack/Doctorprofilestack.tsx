import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DoctorAvailabilityWithId from '../../screen/Addavailability';
import Doctorprofile from '../../screen/Doctorprofile';

export default function DoctorProfilestack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Doctorprofile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Addavailability"
        component={DoctorAvailabilityWithId}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
