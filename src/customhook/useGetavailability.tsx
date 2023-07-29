import axios from "axios";
import {GETAVAILABILITY_URL } from "../API_CONFIG";
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../redux/Store';

export async function useGetavailability(payload: any) {

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {

      var res = await axios.post(GETAVAILABILITY_URL, payload);

      console.log("res", res.data);

        myResolve(res);
     
    } catch (error: any) {

     
        myReject(error);
      
    }
  });

  return myPromise;
}
