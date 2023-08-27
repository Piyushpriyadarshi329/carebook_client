import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {UPDATE_SLOTS_STATUS_URL} from '../API_CONFIG';
import {updateSlotsStatusRequest} from '../types';
import {useAlert} from '../utils/useShowAlert';

export function useUpdateSlotStatus(onSuccess: any) {
  const qc = useQueryClient();
  const {axiosAlert} = useAlert();
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
      onError: axiosAlert,
    },
  );
}
