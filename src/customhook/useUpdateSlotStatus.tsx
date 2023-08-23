import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {UPDATE_SLOTS_STATUS_URL} from '../API_CONFIG';
import {AddLeaveRequest, updateSlotsStatusRequest} from '../types';

export function useUpdateSlotStatus(onSuccess: any) {
  const qc = useQueryClient();

  return useMutation(
    (payload: updateSlotsStatusRequest) =>
      axios.post(UPDATE_SLOTS_STATUS_URL, payload),
    {
      onSuccess: (data, variables) => {
        qc.invalidateQueries(['APPOINTMENTS']);
        // onSuccess();
      },
    },
  );
}
