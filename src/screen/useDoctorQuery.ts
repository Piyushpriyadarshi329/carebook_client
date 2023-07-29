import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GETDOCTORLIST_URL} from '../API_CONFIG';
import {GetDoctorsListResponse} from '../types';

export const useGetDoctorsList = (clinic_id: string) => {
  return useQuery(
    ['DOCTORS'],
    () => axios.post<GetDoctorsListResponse>(GETDOCTORLIST_URL, {clinic_id}),
    {
      select: data => data.data,
    },
  );
};
