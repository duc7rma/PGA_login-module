import { ILoginParams, ILoginValidation, ISignUpParams, ISignUpValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';
import * as Yup from 'yup';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

const validateRepeatPassword = (password: string, repeatPassword: string) => {
  if(!repeatPassword) {
    return 'passwordRequire'
  }

  if(repeatPassword !== password) {
    return 'minPasswordInvalid'
  }

  return ''
}

const validateField = (field: string, value: string | number) => {
  if(value) return ''
  let fieldRequire = ''
  switch(field) {
    case 'name': 
      fieldRequire = 'nameRequire'
      break;

    case 'gender': 
      fieldRequire = 'gender'
      break;

    case 'region': 
      fieldRequire = 'region'
      break;

    case 'state':
      fieldRequire = 'state'
      break;

    
  }
  return fieldRequire
}

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};

export const validateSignUp = (values: ISignUpParams): ISignUpValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
    name: validateField('name', values.name),
    gender: validateField('gender', values.gender),
    region: validateField('region', values.region),
    state: validateField('state', values.state)
  } 
}

export const validSignUp = (values: ISignUpValidation) => {
  return !values.email && !values.password && !values.repeatPassword && !values.name
    && !values.gender && !values.region && !values.state
};

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email required'),
  password: Yup.string()
    .required('No password provided.')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
});

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required('Email required'),
  password: Yup.string()
    .required('No password provided.')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  repeatPassword: Yup.string()
    .required('Please repeat your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  name: Yup.string().required('Please enter your full name'),
  gender: Yup.string().required('Please chose your gender'),
  region: Yup.number().required('Please chose your region').min(1, 'Please chose your region'),
  state: Yup.number().required('Please chose your state').min(1, 'Please chose your city'),
});

