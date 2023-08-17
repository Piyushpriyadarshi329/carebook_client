import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const useAlert = () => {
  const errorAlert = (text1?: string, text2?: string) =>
    Toast.show({type: 'error', text1: text1 ?? 'Something went wrong', text2});
  const successAlert = (text1: string, text2?: string) =>
    Toast.show({type: 'success', text1, text2});
  return {errorAlert, successAlert};
};
