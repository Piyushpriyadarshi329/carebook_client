import axios from 'axios';
import {ADDADDRESS_URL} from '../../../API_CONFIG';
import {useMutation} from '@tanstack/react-query';
import {AddAdressRequest} from '../../../types';
import {useAlert} from '../../../utils/useShowAlert';

export function useAddaddressMutation({
  onSuccess,
}: {
  onSuccess: (data: any) => void;
}) {
  const {errorAlert} = useAlert();
  return useMutation(
    (payload: AddAdressRequest) => axios.post(ADDADDRESS_URL, payload),
    {
      onSuccess: onSuccess,
      onError: (e: any) => {
        console.log('e: ', e);
        errorAlert();
      },
    },
  );
}
