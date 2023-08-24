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

export function useAddAvailability(props?: {onSuccess?: any}) {
  const qc = useQueryClient();
  const {successAlert} = useAlert();
  return useMutation(
    (payload: AddAvailabilityRequest) =>
      axios.post<any>(ADD_AVAILABILITY_URL, payload),
    {
      onSuccess: data => {
        console.log('data', data.data);
        qc.invalidateQueries(['AVAILABILITY']);
        successAlert('Added Availability.');
        props?.onSuccess?.();
      },
    },
  );
}
