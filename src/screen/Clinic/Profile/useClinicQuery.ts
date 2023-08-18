import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {updateClinicUrl} from '../../../API_CONFIG';
import {UpdateClinicRequest} from '../../../types';
import {useAlert} from '../../../utils/useShowAlert';

export const useUpdateClinic = (id: string, onSuccess?: () => void) => {
  const {errorAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation(
    (payload: UpdateClinicRequest) =>
      axios.post(updateClinicUrl + `/${id}`, payload),
    {
      onError: e => {
        console.error(e);
        errorAlert();
      },
      onSuccess: () => {
        qc.invalidateQueries(['CLINICS', {clinic_id: id}]);
        onSuccess?.();
      },
    },
  );
};
