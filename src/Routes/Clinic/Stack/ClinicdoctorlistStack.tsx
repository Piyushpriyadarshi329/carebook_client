import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DoctorAvaiability} from '../../../screen/Availability/Addavailability';
import Adddoctor from '../../../screen/Clinic/AddDoctor';
import Doctorlist from '../../../screen/Clinic/DoctorList';
import {DoctorProfile} from '../../../screen/Doctor/Profile';
import {Leave} from '../../../screen/Doctor/Leave/Leave';
import {AppPages} from '../../appPages';
import {AppointmentForDoctor} from '../../../screen/Appointment/Appointments';
import AddDoctorProfile from '../../../screen/Clinic/AddDoctor/AddDoctorProfile';

export default function Clinicdoctorliststack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppPages.DoctorList}
        component={Doctorlist}
        options={{headerShown: false, headerTitle: 'Doctors'}}
      />
      <Stack.Screen
        name={AppPages.AddDoctor}
        component={Adddoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.AddDoctorProfile}
        component={AddDoctorProfile}
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
        name={AppPages.Leave}
        component={Leave}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.Appointments}
        component={AppointmentForDoctor}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
