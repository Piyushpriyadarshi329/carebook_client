import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
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
