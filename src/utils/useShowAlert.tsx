import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {texts} from '../asset/constants';
import {DataResponse} from '../types';

export const useAlert = () => {
  const errorAlert = (text1?: string, text2?: string) =>
    Toast.show({type: 'error', text1: text1 ?? 'Something went wrong', text2});
  const successAlert = (text1: string, text2?: string) =>
    Toast.show({type: 'success', text1, text2});
  const axiosAlert = (e: any) => {
    if (e.response) {
      const responseData = e.response.data as DataResponse<any>;
      console.error(responseData);
      errorAlert(
        responseData
          ? responseData.data.message ?? responseData.Message
          : texts.SomethingWentWrong,
      );
    }
  };
  return {errorAlert, successAlert, axiosAlert};
};

export const errorCodeToReason = {
  1064: 'SQL Error',
  1062: 'Duplicate Entry',
};
