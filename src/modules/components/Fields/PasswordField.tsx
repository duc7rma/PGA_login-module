import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function PasswordField(props: Props) {
  const { error, isTouched } = props;

  return (
    <div className="col-md-12">
      <label htmlFor="inputPassword" className="form-label">
        <FormattedMessage id="password" />
      </label>
      <Field
        type="password"
        className="form-control"
        id="inputPassword"
        name="password"
        placeholder="Enter your password"
      />
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default PasswordField;
