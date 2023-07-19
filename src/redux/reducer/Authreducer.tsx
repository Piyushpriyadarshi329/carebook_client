import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  islogin: boolean;
  isclinic: boolean;
  isdoctor: boolean;
  username:null|string,
  userid:null| string
}

const initialState: CounterState = {
  islogin: true,
  isclinic: true,
  isdoctor: false,
  username:null,
  userid:null
};

export const Appstatereducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateappstate: (state, action: PayloadAction<any>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {updateappstate} = Appstatereducer.actions;

export default Appstatereducer.reducer;
