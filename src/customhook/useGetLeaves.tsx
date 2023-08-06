import axios from 'axios';
import {GETLEAVE_URL} from '../API_CONFIG';

export async function useGetLeaves(payload: any) {
  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.post(GETLEAVE_URL, payload);

      // console.log('res', res.data);

      myResolve(res);
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
