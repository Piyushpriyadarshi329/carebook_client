import axios from 'axios';
import {GET_SPECIALTY_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {GetSpecialityListResponse} from '../types';

export function useGetSpecialtiesQuery() {
  return useQuery(
    ['SPECIALTIES'],
    () => axios.get<GetSpecialityListResponse>(GET_SPECIALTY_URL),
    {
      select: data => data.data.data,
    },
  );
}
