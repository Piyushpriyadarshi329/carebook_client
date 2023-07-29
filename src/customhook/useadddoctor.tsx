// import {useQueryClient} from '@tanstack/react-query';
// import axios from 'axios';
// import {ADDDOCTOR_URL} from '../API_CONFIG';

// export async function useadddoctor(payload: any) {
//   console.log('ADDDOCTOR_URL=============>', ADDDOCTOR_URL, payload);
//   const qc = useQueryClient();
//   // const config: any =  {
//   //     headers: {
//   //       Authorization: `Bearer ${rentalbikedetails.accessToken}`,
//   //     },
//   //   };

//   let myPromise = new Promise(async function (myResolve, myReject) {
//     try {
//       console.log('ADDDOCTOR_URL=============>', ADDDOCTOR_URL, payload);

//       var res = await axios.post(ADDDOCTOR_URL, payload);

//       console.log('res', res.data);

//       myResolve(res);
//       qc.invalidateQueries(['DOCTORS']);
//     } catch (error: any) {
//       myReject(error);
//     }
//   });

//   return myPromise;
// }

import {ADDDOCTOR_URL} from '../API_CONFIG';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {AddDoctorRequest, AddDoctorResponse} from '../types';

export const useAddDoctor = ({onSuccess}: {onSuccess: () => void}) => {
  const qc = useQueryClient();
  return useMutation(
    (payload: AddDoctorRequest) => {
      return axios.post<AddDoctorResponse>(ADDDOCTOR_URL, payload);
    },
    {
      onSuccess: () => {
        qc.invalidateQueries(['DOCTORS']);
        onSuccess();
      },
      onError: e => {
        alert(e.Message);
      },
    },
  );
};
