import axios from "axios";
import {ADDAVAILABILITY_URL } from "../API_CONFIG";

export async function useAddavailability(payload: any) {

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      console.log("ADDAVAILABILITY_URL=============>", ADDAVAILABILITY_URL,payload);

      var res = await axios.post(ADDAVAILABILITY_URL, payload);

      console.log("res", res.data);

        myResolve(res);
     
    } catch (error: any) {

     
        myReject(error);
      
    }
  });

  return myPromise;
}
