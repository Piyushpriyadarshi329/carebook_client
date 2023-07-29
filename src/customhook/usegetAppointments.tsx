import axios from 'axios';
import {GETAPPOINTMENTS_URL} from '../API_CONFIG';

export async function usegetAppointments(payload: any) {
  console.log('payload', payload);

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.post(GETAPPOINTMENTS_URL, payload);

      if (res?.data?.Success && res?.status == 200) {
        myResolve(res.data);
      } else {
        myReject({statuscode: 401});
      }
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
