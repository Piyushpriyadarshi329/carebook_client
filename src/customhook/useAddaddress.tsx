import axios from 'axios';
import {ADDADDRESS_URL} from '../API_CONFIG';

export async function useAddaddress(payload: any) {
  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      console.log('ADDAVAILABILITY_URL=============>', ADDADDRESS_URL, payload);

      var res = await axios.post(ADDADDRESS_URL, payload);

      console.log('res', res.data);

      myResolve(res);
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
