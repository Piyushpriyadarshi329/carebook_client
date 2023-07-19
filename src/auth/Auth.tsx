import {View, Text} from 'react-native';
import React from 'react';

import type {RootState} from '../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import Beforelogin from './Beforelogin';
import DocterRoute from './DocterRoute';
import ClinicRoute from './ClinicRoute';

//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

export default function Auth() {
  const Appdata = useSelector((state: RootState) => state.Appdata);
  console.log('Appdata', Appdata);

  return (
    <>
      {Appdata.islogin ? (
        <>{Appdata.isdoctor ? <DocterRoute /> : <ClinicRoute />}</>
      ) : (
        <>
          <Beforelogin />
        </>
      )}
    </>
  );
}
