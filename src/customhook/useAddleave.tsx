import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {ADDLEAVE_URL} from '../API_CONFIG';
import {AddLeaveRequest} from '../types';

export function useAddleave(onSuccess: any) {
  const qc = useQueryClient();

  return useMutation(
    (payload: AddLeaveRequest) => axios.post(ADDLEAVE_URL, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['LEAVES']);
        onSuccess();
      },
    },
  );
}
