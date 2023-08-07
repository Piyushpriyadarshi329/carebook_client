import axios from 'axios';
import {GETLEAVE_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {DataResponse, LeaveDto} from '../types';

export function useGetLeaves(payload: any) {
  return useQuery(
    ['LEAVES', payload],
    () => axios.post<DataResponse<LeaveDto[]>>(GETLEAVE_URL, payload),
    {select: data => data.data.data},
  );
}
