export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface ISignUpParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: string | number;
  state: string | number ;
}

export interface ILocationParams {
  id: string | number;
  pid: number | null;
  name: string
}

export interface ISignUpValidation {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: string;
  state: string;
  // field: string;
}

export interface IGenderParams {
  label: string;
  value: string;
}
