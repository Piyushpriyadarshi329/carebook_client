import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../../asset/Color';
import Clinicdoctorliststack from './Stack/ClinicdoctorlistStack';
import Clinicprofilestack from './Stack/ClinicprofileStack';
import {AppPages} from '../../appPages';

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
              case AppPages.DoctorStack:
                iconName = 'list';
                break;
              case 'ProfileStack':
                iconName = 'user';
                break;
              default:
                break;
            }

            return <Icon name={iconName} color={color} size={24} />;
          },
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: Color.secondary,
        })}>
        <Tab.Screen
          name={AppPages.DoctorStack}
          component={Clinicdoctorliststack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="ProfileStack"
          component={Clinicprofilestack}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
