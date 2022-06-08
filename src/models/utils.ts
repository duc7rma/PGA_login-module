import { ILoginParams, ILoginValidation } from './auth'

const validEmailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (email: string) => {
  if (!email) {
    return 'Email require';
  }

  if (!validEmailRegex.test(email)) {
    return 'Email Invalid';
  }

  return '';
};

const valdiatePassword = (password: string) => {
  if (!password) {
    return 'Password require';
  }

  if (password.length < 4) {
    return 'Min password invalid';
  }

  return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: valdiatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};
