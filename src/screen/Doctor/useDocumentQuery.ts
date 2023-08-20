import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {DOCUMENT} from '../../API_CONFIG';
import {decode} from 'base64-arraybuffer';
import {useAlert} from '../../utils/useShowAlert';
const FormData = require('form-data');

export const useAddDocumentMutation = (props?: {
  onSuccess?: (data: any) => void;
}) => {
  const {axiosAlert} = useAlert();
  return useMutation(
    (base64: string) => {
      console.log('base64', base64.length);

      var form = new FormData();
      form.append('file', decode(base64));
      console.log('DOCUMENT', DOCUMENT);
      axios({
        method: 'post',
        url: DOCUMENT,
        data: form,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then(res => {
        console.log('res', res);
      });
    },
    {
      onSuccess: data => {
        console.log('data.data');
        props?.onSuccess?.(data.data);
      },
      onError: e => {
        console.log('error==>', e);
        axiosAlert(e);
      },
    },
  );
};
