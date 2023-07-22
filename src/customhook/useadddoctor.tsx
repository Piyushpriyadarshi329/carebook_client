import axios from "axios";
import {signup_URL } from "../API_CONFIG";

export async function useRegister(payload: any) {
  console.log("signup_URL=============>", signup_URL,payload);

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      console.log("signup_URL=============>", signup_URL,payload);

      var res = await axios.post(signup_URL, payload);

      console.log("res", res.data);

        myResolve(res);
     
    } catch (error: any) {

     
        myReject(error);
      
    }
  });

  return myPromise;
}
