import axios from 'axios';
import {GET_ADDRESS_URL} from '../API_CONFIG';
import {useQuery} from '@tanstack/react-query';
import {AddressDto, DataResponse, GetAdressRequest} from '../types';

export function useGetaddress(payload: GetAdressRequest) {
  return useQuery(
    ['ADDRESS', payload],
    () => axios.post<DataResponse<AddressDto[]>>(GET_ADDRESS_URL, payload),
    {
      select: data => data.data.data,
    },
  );
}
