import axios from 'axios';
import {LOGIN_URL} from '../API_CONFIG';
import {useMutation} from '@tanstack/react-query';
import {axiosAlert, errorAlert} from '../utils/useShowAlert';

export function useLoginQuery({onSuccess}: {onSuccess: any}) {
  return useMutation((payload: any) => axios.post(LOGIN_URL, payload), {
    onSuccess: data => {
      if (data.data.Success) {
        onSuccess(data.data.data);
      } else {
        errorAlert(data.data.Message);
      }
    },
    onError: axiosAlert,
  });
}
