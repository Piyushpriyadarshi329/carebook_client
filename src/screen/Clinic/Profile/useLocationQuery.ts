import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {GetLocationListResponse} from '../../../types';
import {GETLOCATION_URL} from '../../../API_CONFIG';

export function useGetLocation() {
  return useQuery(
    [],
    () => axios.get<GetLocationListResponse>(GETLOCATION_URL),
    {
      select: data => data.data.data,
    },
  );
}
