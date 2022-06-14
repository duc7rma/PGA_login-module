import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function EmailField(props: Props) {
  const { error, isTouched } = props;

  return (
    <div className="col-md-12">
      <label htmlFor="inputEmail" className="form-label">
        <FormattedMessage id="email" />
      </label>
      <Field type="text" className="form-control" name="email" id="inputEmail" placeholder="Enter your email" />
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default EmailField;
