import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Platform} from 'react-native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import RNKeyboardManager from 'react-native-keyboard-manager';

const useKeyboardAvoidHook = () => {
  const onFocusEffect = useCallback(() => {
    if (Platform.OS !== 'ios') {
      AvoidSoftInput.setAdjustResize();
    } else {
      RNKeyboardManager.setEnable(true);
    }

    return () => {
      if (Platform.OS !== 'ios') {
        AvoidSoftInput.setDefaultAppSoftInputMode();
      } else {
        RNKeyboardManager.setEnable(false);
      }
    };
  }, []);

  useFocusEffect(onFocusEffect);
};

export default useKeyboardAvoidHook;
