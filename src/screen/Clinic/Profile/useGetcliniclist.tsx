// GETDOCTORLIST_URL

import axios from 'axios';
import {GET_CLINIC_LIST_URL} from '../../../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {GetClinicsResponse} from '../../../types';

export function useClinicsList(payload: {
  clinic_id?: string;
  doctor_id?: string;
}) {
  return useQuery(
    ['CLINICS', payload],
    () => axios.post<GetClinicsResponse>(GET_CLINIC_LIST_URL, payload),
    {
      select: data => data.data.data,
    },
  );
}
