import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Beforelogin from './auth/Beforelogin';
import ClinicRoute from './Routes/Clinic/ClinicRoute';
import DocterRoute from './Routes/Doctor/DocterRoute';
import type {RootState} from './redux/Store';
import {updateappstate} from './redux/reducer/Authreducer';
import Splashscreen from './auth/Splashscreen';

//GIT   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

export default function Auth() {
  const Appdata = useSelector((state: RootState) => state.Appdata);
  const dispatch = useDispatch();
  const [showsplash, setshowsplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getsayncdata();
    }, 1500);
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
