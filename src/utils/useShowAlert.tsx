import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {texts} from '../asset/constants';

export const useAlert = () => {
  const errorAlert = (text1?: string, text2?: string) =>
    Toast.show({type: 'error', text1: text1 ?? 'Something went wrong', text2});
  const successAlert = (text1: string, text2?: string) =>
    Toast.show({type: 'success', text1, text2});
  const axiosAlert = (e: any) => {
    try {
      if (e.response) {
        if (e.response.data) {
          errorAlert(e.response.data.data?.message || e.response.data.Message);
        } else {
          errorAlert(texts.SomethingWentWrong);
        }
      }
    } catch (e) {
      errorAlert(texts.SomethingWentWrong);
    }
  };
  return {errorAlert, successAlert, axiosAlert};
};

export const errorCodeToReason = {
  1064: 'SQL Error',
  1062: 'Duplicate Entry',
};
