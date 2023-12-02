import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {
  ADD_AVAILABILITY_URL,
  AVAILABILITY_URL,
  GET_AVAILABILITY_URL,
} from '../../API_CONFIG';
import {
  AddAvailabilityRequest,
  AvailabilityRes,
  GetAvailabilityRequest,
  GetAvailabilityResponse,
} from '../../types';
import _ from 'lodash';
import {useAlert} from '../../utils/useShowAlert';
import {days, weeks} from './helper';

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
          entryId => {
            const weekDays = _.uniq(
              groupedByEntryID[entryId]
                .map(e => e.week_day)
                .sort((a, b) => a - b),
            );
            const av_weeks = _.uniq(
              groupedByEntryID[entryId]
                .map(e => e.week)
                .sort((a, b) => Number(a) - Number(b)),
            );
            return {
              ...groupedByEntryID[entryId][0],
              week_day:
                weekDays.length === 7
                  ? 'All Days'
                  : weekDays.map(e => days[e].label).join(', '),
              week:
                av_weeks.length === 4 ||
                av_weeks.length === 0 ||
                (av_weeks.length === 1 && av_weeks[0] === null)
                  ? 'All Weeks'
                  : av_weeks
                      .map(w => weeks.find(ww => ww.value == w)?.label ?? '')
                      .join(', '),
            };
          },
        );
        return newData;
      },
    },
  );
}

export const useRemoveAvailability = (p?: () => void) => {
  const qc = useQueryClient();
  const {axiosAlert} = useAlert();
  return useMutation(
    (id: string) => axios.delete(`${AVAILABILITY_URL}/${id}`),
    {
      onSuccess: () => {
        qc.invalidateQueries(['AVAILABILITY']);
        p?.();
      },
      onError: axiosAlert,
    },
  );
};

export function useAddAvailability(props?: {onSuccess?: any}) {
  const qc = useQueryClient();
  const {successAlert, axiosAlert} = useAlert();
  return useMutation(
    (payload: AddAvailabilityRequest) =>
      axios.post<any>(ADD_AVAILABILITY_URL, payload),
    {
      onSuccess: data => {
        qc.invalidateQueries(['AVAILABILITY']);
        successAlert('Added Availability.');
        props?.onSuccess?.();
      },
      onError: axiosAlert,
    },
  );
}
