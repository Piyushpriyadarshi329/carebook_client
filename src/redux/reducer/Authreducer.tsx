import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CounterState {
  islogin: boolean;
  isclinic: boolean;
  isdoctor: boolean;
  username: null | string;
  userid: string;
}

const initialState: CounterState = {
  islogin: false,
  isclinic: false,
  isdoctor: false,
  username: null,
  userid: '',
};

export const Appstatereducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateappstate: (state, action: PayloadAction<any>) => {
      let newdata = {...state, ...action.payload};

      AsyncStorage.setItem('appstate', JSON.stringify(newdata));

      return newdata;
    },
  },
});

export const {updateappstate} = Appstatereducer.actions;

export default Appstatereducer.reducer;
