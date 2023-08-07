import axios from 'axios';
import {GETAPPOINTMENTS_URL} from '../API_CONFIG';
import {useQueries, useQuery} from '@tanstack/react-query';
import {GetAppointmentResponse} from '../types';

export function usegetAppointments(payload: any) {
  return useQuery(
    ['APPOINTMENTS', payload],
    () => axios.post<GetAppointmentResponse>(GETAPPOINTMENTS_URL, payload),
    {select: data => data.data.data},
  );
}
