import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GETAVAILABILITY_URL} from '../API_CONFIG';
import {
  AvailabilityRes,
  GetAvailabilityRequest,
  GetAvailabilityResponse,
} from '../types';

const days = [
  {
    value: 0,
    label: 'SUN',
  },
  {
    value: 1,
    label: 'MON',
  },
  {
    value: 2,
    label: 'TUE',
  },
  {
    value: 3,
    label: 'WED',
  },
  {
    value: 4,
    label: 'THU',
  },
  {
    value: 5,
    label: 'FRI',
  },
  {
    value: 6,
    label: 'SAT',
  },
];

export interface Availability extends Omit<AvailabilityRes, 'week_day'> {
  week_day: string;
}

export function useGetavailability(payload: GetAvailabilityRequest) {
  return useQuery(
    ['AVAILABILITY', payload],
    () => {
      console.log('getavailablity');
      return axios.post<GetAvailabilityResponse>(GETAVAILABILITY_URL, payload);
    },
    {
      select: data => {
        let transformedData = data.data.data;
        let newData: Availability[] = [];
        transformedData?.map(i => {
          let local = newData?.filter((j: any) => j.entry_id == i.entry_id);
          if (!!local?.length) {
            newData = newData.map((k: any) => {
              if (k.entry_id == i.entry_id) {
                return {
                  ...k,
                  week_day: k.week_day + ',' + days[i.week_day].label,
                };
              } else {
                return k;
              }
            });
          } else {
            newData.push({...i, week_day: days[i.week_day].label});
          }
        });
        return newData;
      },
    },
  );
}
