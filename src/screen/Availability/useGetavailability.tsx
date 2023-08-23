import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {AVAILABILITY_URL, GET_AVAILABILITY_URL} from '../../API_CONFIG';
import {
  AvailabilityRes,
  GetAvailabilityRequest,
  GetAvailabilityResponse,
} from '../../types';
import _ from 'lodash';

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
export interface AvailabilityFE
  extends Omit<AvailabilityRes, 'week' | 'week_day'> {
  week: string;
  week_day: string;
}
export function useGetAvailabilityQuery(payload: GetAvailabilityRequest) {
  return useQuery(
    ['AVAILABILITY', payload],
    () => {
      return axios.post<GetAvailabilityResponse>(GET_AVAILABILITY_URL, payload);
    },
    {
      select: data => {
        let transformedData = data.data.data;

        const groupedByEntryID = _.groupBy(transformedData, 'entry_id');
        const newData = Object.keys(groupedByEntryID).map<AvailabilityFE>(
          entryId => ({
            ...groupedByEntryID[entryId][0],
            week_day: groupedByEntryID[entryId].reduce(
              (text, entry) =>
                text + (text ? ',' : '') + days[entry.week_day].label,
              '',
            ),
            week: groupedByEntryID[entryId].reduce(
              (text, entry) =>
                text + (text ? ',' : '') + weeks[entry.week ?? 0].label,
              '',
            ),
          }),
        );
        return newData;
      },
    },
  );
}

export const useRemoveAvailability = () => {
  const qc = useQueryClient();
  return useMutation(
    (id: string) => axios.delete(`${AVAILABILITY_URL}/${id}`),
    {
      onSuccess: () => qc.invalidateQueries(['AVAILABILITY']),
    },
  );
};
