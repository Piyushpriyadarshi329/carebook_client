import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import Home from '../screen/Home';
import DoctorProfilestack from './stack/Doctorprofilestack';

import Appointmentsstack from './stack/Appointmentsstack';

const Tab = createBottomTabNavigator();

export default function DocterRoute() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Appointments':
                iconName = 'book';
                break;
              case 'Profile':
                iconName = 'user';
                break;
              default:
                break;
            }
            return <Icon name={iconName} color={Color.primary} size={24} />;
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Appointments"
          component={Appointmentsstack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={DoctorProfilestack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
