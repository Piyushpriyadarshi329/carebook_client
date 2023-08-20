import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {DOCUMENT} from '../../API_CONFIG';
import {decode} from 'base64-arraybuffer';
import {useAlert} from '../../utils/useShowAlert';

export const useAddDocumentMutation = (props?: {
  onSuccess?: (data: any) => void;
}) => {
  const {axiosAlert} = useAlert();
  return useMutation(
    (base64: string) => {
      const form = new FormData();
      form.append('file', decode(base64));
      return axios.post(DOCUMENT, form);
    },
    {
      onSuccess: data => {
        props?.onSuccess?.(data.data);
      },
      onError: e => axiosAlert(e),
    },
  );
};
