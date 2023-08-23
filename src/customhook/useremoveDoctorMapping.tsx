import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {REMOVE_DOCTOR_MAPPING_URL} from '../API_CONFIG';
import {AddLeaveRequest} from '../types';
import {useAlert} from '../utils/useShowAlert';

export function useremoveDoctorMapping(onSuccess: any) {
  const qc = useQueryClient();
  const {axiosAlert} = useAlert();
  return useMutation(
    (payload: AddLeaveRequest) =>
      axios.post(REMOVE_DOCTOR_MAPPING_URL, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['DOCTORS']);
        onSuccess();
      },
      onError: e => {
        axiosAlert(e);
      },
    },
  );
}
