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
          errorAlert(
            errorCodeToReason[e.response.data.data?.errno as number] ||
              e.response.data.data?.message ||
              e.response.data.Message,
          );
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

export const errorCodeToReason: {[key in number]: string} = {
  1062: 'Entry Already Exists',
};
// 1064: 'SQL Error',
