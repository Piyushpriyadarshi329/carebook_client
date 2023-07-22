import axios from "axios";
import { LOGIN_URL } from "../API_CONFIG";

export async function useLogin(payload: any) {
  console.log("Login_URL=============>", LOGIN_URL,payload);

  // const config: any =  {
  //     headers: {
  //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
  //     },
  //   };

  let myPromise = new Promise(async function (myResolve, myReject) {
    try {
      console.log("Login_URL=============>", LOGIN_URL,payload);

      var res = await axios.post(LOGIN_URL, payload);

      console.log("res", res.data);

        myResolve(res);
      
    } catch (error: any) {

      
        myReject(error);
      }
    
  });

  return myPromise;
}
