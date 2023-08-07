import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Clinicprofile from '../../screen/Clinicprofile';
import Editprofile from '../../screen/Editprofile';

export default function Clinicprofilestack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Clinicprofile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Editprofile"
        component={Editprofile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
