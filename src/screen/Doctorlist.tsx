import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../asset/Color';
import Doctorcard from '../components/Doctorcard';
import {useNavigation} from '@react-navigation/native';
import {useGetdoctorlist} from '../customhook/useGetdoctorlist';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../redux/Store';
import {useGetDoctorsList} from './useDoctorQuery';

export default function Doctorlist() {
  const navigation = useNavigation();
  const Appdata = useSelector((state: RootState) => state);

  const {data: doctorlist} = useGetDoctorsList(Appdata.Appdata.userid ?? '');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 10}}>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Adddoctor');
            }}>
            <Icon name="add-circle" color={Color.primary} size={35} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 20}}>
          {doctorlist?.data?.length == 0 ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black'}}>No Doctor FOund</Text>
            </View>
          ) : (
            <ScrollView>
              {doctorlist?.data?.map((i: any, index: number) => {
                return (
                  <View style={{flex: 1}} key={index}>
                    <Doctorcard data={i} />
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
}
