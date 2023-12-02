// GETDOCTORLIST_URL

import axios from 'axios';
import {GET_DOCTOR_LIST_URL} from '../API_CONFIG';

export async function useGetdoctorlist(payload: any) {
  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.post(GET_DOCTOR_LIST_URL, payload);

      myResolve(res);
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
