import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {REMOVEDOCTORMAPPING_URL} from '../API_CONFIG';
import {AddLeaveRequest} from '../types';
import {useAlert} from '../utils/useShowAlert';

export function useremoveDoctorMapping(onSuccess: any) {
  const qc = useQueryClient();
  const {axiosAlert} = useAlert();
  return useMutation(
    (payload: AddLeaveRequest) => axios.post(REMOVEDOCTORMAPPING_URL, payload),
    {
      onSuccess: () => {
        qc.invalidateQueries(['LEAVES']);
        onSuccess();
      },
      onError: e => {
        axiosAlert(e);
      },
    },
  );
}
