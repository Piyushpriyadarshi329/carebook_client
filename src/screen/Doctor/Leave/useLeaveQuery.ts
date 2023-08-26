import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {LEAVE} from '../../../API_CONFIG';
import {useAlert} from '../../../utils/useShowAlert';

export const useRemoveLeave = (props?: {onSuccess?: any}) => {
  const {axiosAlert} = useAlert();
  const qc = useQueryClient();
  return useMutation((id: string) => axios.delete(`${LEAVE}/${id}`), {
    onSuccess: () => {
      qc.invalidateQueries(['LEAVES']);
      props?.onSuccess();
    },
    onError: axiosAlert,
  });
};
