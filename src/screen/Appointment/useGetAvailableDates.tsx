import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {getAvailableDates_Url} from '../../API_CONFIG';
import {DataResponse} from '../../types';

export function useGetAvailableDates(payload: {
  date: number | undefined;
  doctor_id: string;
  clinic_id: string | undefined;
}) {
  return useQuery(
    [payload],
    () =>
      axios.post<DataResponse<{date: number; available: boolean}[]>>(
        getAvailableDates_Url,
        payload,
      ),
    {
      select: data => data.data.data,
    },
  );
}
