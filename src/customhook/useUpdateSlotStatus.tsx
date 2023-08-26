import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {UPDATE_SLOTS_STATUS_URL} from '../API_CONFIG';
import {AddLeaveRequest, updateSlotsStatusRequest} from '../types';

export function useUpdateSlotStatus(onSuccess: any) {
  const qc = useQueryClient();

  return useMutation(
    (
      payload: updateSlotsStatusRequest & {
        doctorId: string;
        appointmentDate: number;
      },
    ) =>
      axios.post(UPDATE_SLOTS_STATUS_URL, {
        id: payload.id,
        status: payload.status,
      }),
    {
      onSuccess: (data, variables) => {
        qc.invalidateQueries([
          'APPOINTMENTS',
          variables.doctorId,
          variables.appointmentDate,
        ]);
        // onSuccess();
      },
    },
  );
}
