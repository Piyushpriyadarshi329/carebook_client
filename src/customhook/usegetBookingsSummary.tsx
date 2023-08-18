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

        // data?.data?.data.map((i: any) => {

        for (let i = -7; i < 0; i++) {
          let curdate = new Date();

          curdate.setDate(curdate.getDate() + i);

          console.log('curdate', curdate);

          let updatedate = new Date(
            curdate.toISOString().split('T')[0] + 'T00:00:00.000Z',
          );

          let timestamp = updatedate.getTime();
          console.log('timestamp', timestamp);

          let filterdata = data.data.data.filter(
            i => i.appointment_date == timestamp,
          );

          console.log('filterdata', filterdata);

          if (filterdata.length > 0) {
            // count.push(filterdata[0].count);

            count.push(filterdata.reduce((acc, cur) => acc + cur.count, 0));
          } else {
            count.push(0);
          }

          console.log('updatedate', updatedate);

          let month = updatedate.getMonth();

          let d1 = updatedate.getDate();

          let s1: string = d1 + ' ' + monthlist[month];
          datelabel.push(s1);
        }

        return {count, datelabel};
      },
    },
  );
}
