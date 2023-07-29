// GETDOCTORLIST_URL

import axios from "axios";
import {GETDOCTORLIST_URL } from "../API_CONFIG";

export async function useGetdoctorlist(payload: any) {

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };



  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      var res = await axios.post(GETDOCTORLIST_URL, payload);

      console.log("res", res.data);

        myResolve(res);
     
    } catch (error: any) {

     
        myReject(error);
      
    }
  });

  return myPromise;
}
