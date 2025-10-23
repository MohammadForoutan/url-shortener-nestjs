import { isEmail as isEmailValidator } from 'class-validator';

export const isEmail = (email: string): boolean => {
  return isEmailValidator(email);
};
