import axios from 'axios';
import {ADDAVAILABILITY_URL} from '../API_CONFIG';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AddAvailabilityRequest} from '../types';

export function useAddavailability(props?: {onSuccess?: any}) {
  const qc = useQueryClient();
  return useMutation(
    (payload: AddAvailabilityRequest) =>
      axios.post<any>(ADDAVAILABILITY_URL, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['AVAILABILITY']);
        props?.onSuccess?.();
      },
    },
  );
}
