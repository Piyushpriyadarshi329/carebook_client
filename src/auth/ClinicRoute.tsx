import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Appointments from '../screen/Appointments';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import Clinicprofile from '../screen/Clinicprofile';
import Doctorlist from '../screen/Doctorlist';
import Clinicdoctorliststack from './stack/Clinicdoctorliststack';


const Tab = createBottomTabNavigator();


export default function DocterRoute() {
  return (
    <NavigationContainer>

    <Tab.Navigator
    screenOptions={({route})=>({

      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
    //   style: {
    //     borderRadius: 15,
    //     height: 90,
    // },
    tabBarIcon: ({ focused, color, size }) => {
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
      // return <Ionicons name={iconName} size={size} color={color} />;
      // return <LottieView source={filePath} loop={false} autoPlay={focused} />;
      return <Icon name={iconName} color={Color.primary} size={24} />;
  },

    })}
    >
      {/* <Tab.Screen name="Home" component={Home} 
      options={{headerShown:false}}
      /> */}
      <Tab.Screen name="Profile" component={Clinicprofile} 
            options={{headerShown:false ,
              // tabBarIcon:        return  (  <Icon name="plus" size={30} color="red" />)

            
            }}

      />
      <Tab.Screen name="Appointments" component={Clinicdoctorliststack}
            options={{headerShown:false}}

      />
    </Tab.Navigator>
    </NavigationContainer>
  )
}