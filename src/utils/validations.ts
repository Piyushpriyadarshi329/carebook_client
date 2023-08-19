import {emailRegex, phoneRegex} from '../asset/constants';

export const validEmailOrPhone = (value: string) => {
  const validEmail = value.match(emailRegex);
  const validPhone = value.match(phoneRegex);
  return validEmail?.length || validPhone?.length
    ? undefined
    : 'Please Provide Valid User Email / Phone';
};
