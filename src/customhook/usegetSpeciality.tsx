// GETDOCTORLIST_URL

import axios from 'axios';
import {GETSPECIALITY_URL} from '../API_CONFIG';

export async function usegetSpeciality() {
  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.get(GETSPECIALITY_URL);

      console.log('res', res.data);

      myResolve(
        res.data.data.map((i, index) => {
          return {value: i.name, label: i.name};
        }),
      );
    } catch (error: any) {
      myReject(error);
    }
  });

  return myPromise;
}
