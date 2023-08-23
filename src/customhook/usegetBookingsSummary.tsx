import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GET_BOOKING_SUMMARY_Url} from '../API_CONFIG';
import {monthlist, daylist} from './../Appconstant';

import {
  AvailabilityRes,
  GetAvailabilityRequest,
  GetAvailabilityResponse,
  GetBookingsSummaryRequest,
  GetBookingsSummaryResponse,
} from '../types';
export function usegetBookingsSummary(payload: GetBookingsSummaryRequest) {
  return useQuery(
    ['AVAILABILITY', payload],
    () => {
      return axios.post<GetBookingsSummaryResponse>(
        GET_BOOKING_SUMMARY_Url,
        payload,
      );
    },
    {
      select: data => {
        try {
          let count: number[] = [];
          let datelabel: string[] = [];

          for (let i = -7; i < 0; i++) {
            let curdate = new Date();

            curdate.setDate(curdate.getDate() + i);

            let updatedate = new Date(
              curdate.toISOString().split('T')[0] + 'T00:00:00.000Z',
            );

            let timestamp = updatedate.getTime();

            let filterdata = data.data.data.filter(
              i => i.appointment_date == timestamp,
            );

            if (filterdata.length > 0) {
              // count.push(filterdata[0].count);

              count.push(filterdata.reduce((acc, cur) => acc + cur.count, 0));
            } else {
              count.push(0);
            }

            let month = updatedate.getMonth();

            let d1 = updatedate.getDate();

            let s1: string = d1 + ' ' + monthlist[month];
            datelabel.push(s1);
          }

          if (data?.data?.data.length == 0) {
            return {count: [], datelabel};
          } else {
            return {count, datelabel};
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  );
}
