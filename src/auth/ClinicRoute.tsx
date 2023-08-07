import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import Clinicdoctorliststack from './stack/Clinicdoctorliststack';
import Clinicprofilestack from './stack/Clinicprofilestack';

const Tab = createBottomTabNavigator();

export default function DocterRoute() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => {
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
          name="Appointments"
          component={Clinicdoctorliststack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={Clinicprofilestack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
