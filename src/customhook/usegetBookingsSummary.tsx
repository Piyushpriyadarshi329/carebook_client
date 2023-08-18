import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GETBOOKINGSUMMARY_Url} from '../API_CONFIG';
import {monthlist, daylist} from './../Appconstant';

import {
  AvailabilityRes,
  GetAvailabilityRequest,
  GetAvailabilityResponse,
  GetBookingsSummaryRequest,
  GetBookingsSummaryResponse,
} from '../types';
export function usegetBookingsSummary(payload: GetBookingsSummaryRequest) {
  console.log('booking summary', payload);
  return useQuery(
    ['AVAILABILITY', payload],
    () => {
      console.log('usegetBookingsSummary');
      return axios.post<GetBookingsSummaryResponse>(
        GETBOOKINGSUMMARY_Url,
        payload,
      );
    },
    {
      select: data => {
        // console.log('booking data', data.data.data);

        let count: number[] = [];
        let datelabel: string[] = [];

        data?.data?.data.map((i: any) => {
          count.push(i.count);

          console.log('i.appointment_date', i.appointment_date);

          let date = new Date(Number(i.appointment_date));

          console.log('date', date);

          let month = date.getMonth();

          let d1 = date.getDate();

          let s1: string = d1 + ' ' + monthlist[month];
          datelabel.push(s1);
        });

        return {count, datelabel};
      },
    },
  );
}
