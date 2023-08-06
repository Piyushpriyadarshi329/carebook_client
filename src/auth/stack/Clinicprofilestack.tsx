// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Clinicprofilestack() {
//   return (
//     <View>
//       <Text>Clinicprofilestack</Text>
//     </View>
//   )
// }

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
