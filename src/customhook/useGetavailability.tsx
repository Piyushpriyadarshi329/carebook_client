import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {GETAVAILABILITY_URL} from '../API_CONFIG';
import {
  AvailabilityRes,
  GetAvailabilityRequest,
  GetAvailabilityResponse,
} from '../types';

export const days = [
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
export const weeks = [
  {
    value: 0,
    label: 'Week1',
  },
  {
    value: 1,
    label: 'Week2',
  },
  {
    value: 2,
    label: 'Week3',
  },
  {
    value: 3,
    label: 'Week4',
  },
  {
    value: 4,
    label: 'Week5',
  },
];

export interface Availability extends Omit<AvailabilityRes, 'week_day'> {
  week_day: string;
}

export function useGetavailability(payload: GetAvailabilityRequest) {
  return useQuery(
    ['AVAILABILITY', payload],
    () => {
      // console.log('getavailablity');
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
                let localweek_day = '';
                let localweek = '';

                if (!k.week_day.includes(days[i.week_day].label)) {
                  localweek_day = ',' + days[i.week_day].label;
                }
                if (!k.week.includes(weeks[i.week].label)) {
                  localweek = ',' + weeks[i.week].label;
                }

                return {
                  ...k,
                  week_day: k.week_day + localweek_day,
                  week: k.week + localweek,
                };
              } else {
                return k;
              }
            });
          } else {
            newData.push({
              ...i,
              week_day: days[i.week_day].label,
              week: weeks[Number(i.week)].label,
            });
          }
        });

        return newData;
      },
    },
  );
}
