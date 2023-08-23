import axios from 'axios';
import {SIGN_UP_URL} from '../API_CONFIG';

export async function useRegister(payload: any) {
  console.log('signup_URL=============>', SIGN_UP_URL, payload);

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      console.log('signup_URL=============>', SIGN_UP_URL, payload);

      var res = await axios.post(SIGN_UP_URL, payload);

      console.log('res', res.data);

      myResolve(res);
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
