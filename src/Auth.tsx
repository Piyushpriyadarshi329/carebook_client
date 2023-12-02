import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Beforelogin from './auth/Beforelogin';
import ClinicRoute from './Routes/Clinic/ClinicRoute';
import DocterRoute from './Routes/Doctor/DocterRoute';
import type {RootState} from './redux/Store';
import {updateappstate} from './redux/reducer/Authreducer';
import Splashscreen from './auth/Splashscreen';
import messaging from '@react-native-firebase/messaging';
import {useNotificationHandler} from './auth/useNotificationHandler';
import {useQueryClient} from '@tanstack/react-query';

export default function Auth() {
  const Appdata = useSelector((state: RootState) => state.Appdata);
  const dispatch = useDispatch();
  const [showsplash, setshowsplash] = useState(true);
  const qc = useQueryClient();

  useEffect(() => {
    setTimeout(() => {
      getsayncdata();
    }, 1500);
  }, []);

  const handler = useNotificationHandler();
  // console.log('qcdata', qc.getQueriesData(['APPOINTMENTS']));

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      handler(remoteMessage.data as any);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {}, []);

  async function getsayncdata() {
    try {
      let appstate = await AsyncStorage.getItem('appstate');

      if (appstate) {
        appstate = JSON.parse(appstate);

        dispatch(updateappstate(appstate));
      }
      setshowsplash(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showsplash ? (
        <Splashscreen />
      ) : (
        <>
          {Appdata.islogin ? (
            Appdata.isdoctor ? (
              <DocterRoute />
            ) : (
              <ClinicRoute />
            )
          ) : (
            <Beforelogin />
          )}
        </>
      )}
    </>
  );
}
