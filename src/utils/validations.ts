import {emailRegex, phoneRegex} from '../asset/constants';

export const validateEmailOrPhone = (value: string) => {
  const validEmail = value?.match(emailRegex) ?? [];
  const validPhone = value?.match(phoneRegex) ?? [];
  return validEmail?.length || validPhone?.length
    ? undefined
    : 'Please Provide Valid Email / Phone';
};
export const validatePhone = (value: string) => {
  const isValid = value?.match(phoneRegex) ?? [];
  return isValid?.length ? undefined : 'Please Provide Valid Phone Number';
};
export const validateEmail = (value: string) => {
  const isValid = value?.match(emailRegex) ?? [];
  return isValid?.length ? undefined : 'Please Provide Valid Email';
};
