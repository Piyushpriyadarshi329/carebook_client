import axios from 'axios';
import {GETADDRESS_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {AddressDto, DataResponse, GetAdressRequest} from '../types';

export function useGetaddress(payload: GetAdressRequest) {
  return useQuery(
    ['ADDRESS', payload],
    () => axios.post<DataResponse<AddressDto[]>>(GETADDRESS_URL, payload),
    {
      select: data => data.data.data,
    },
  );
}
