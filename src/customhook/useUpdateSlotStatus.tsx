import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {UPDATESLOTSSTATUS_URL} from '../API_CONFIG';
import {AddLeaveRequest, updateSlotsStatusRequest} from '../types';

export function useAddleave(onSuccess: any) {
  const qc = useQueryClient();

  return useMutation(
    (payload: updateSlotsStatusRequest) =>
      axios.post(UPDATESLOTSSTATUS_URL, payload),
    {
      onSuccess: () => {
        // qc.invalidateQueries(['LEAVES']);
        // onSuccess();
      },
    },
  );
}
