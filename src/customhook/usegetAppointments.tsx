import axios from 'axios';
import {GET_APPOINTMENTS_URL} from '../API_CONFIG';
import {useQueries, useQuery} from '@tanstack/react-query';
import {GetAppointmentResponse, GetAppointmentsRequest} from '../types';

export function usegetAppointments(payload: GetAppointmentsRequest) {
  return useQuery(
    ['APPOINTMENTS', payload],
    () => axios.post<GetAppointmentResponse>(GET_APPOINTMENTS_URL, payload),
    {select: data => data.data.data},
  );
}
