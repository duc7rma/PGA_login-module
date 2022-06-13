import React from 'react';
import { useState } from 'react';
import { ILoginParams, ILoginValidation } from 'models/auth';
import { validateLogin, validLogin } from 'modules/auth/utils';
import './LoginForm.css';
import { FormattedMessage } from 'react-intl';

interface Props {
  isLoading: boolean;
  errorMessage: string;
  onLogin(values: ILoginParams): void;
}

function LoginForm(props: Props) {
  const { onLogin, isLoading, errorMessage } = props;

  //! define states
  const [formValues, setFormValues] = useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = useState<ILoginValidation>();

  //! define handle functions
  const handleOnSubmit = () => {
    const dataValidate = validateLogin(formValues);

    setValidate(dataValidate);

    if (!validLogin(dataValidate)) {
      return;
    }

    onLogin(formValues);
  };

  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          value={formValues.email}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />

        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />

        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>

      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="invalidCheck"
            value=""
            checked={formValues.rememberMe}
            onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
      </div>

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={isLoading}
          >
            {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="login" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
//
