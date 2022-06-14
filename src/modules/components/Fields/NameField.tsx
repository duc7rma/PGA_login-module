import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function NameField(props: Props) {
  const { error, isTouched } = props;
  return (
    <div className="col-md-12">
      <label htmlFor="inputName" className="form-label">
        <FormattedMessage id="name" />
      </label>
      <Field type="text" className="form-control" id="inputName" name="name" placeholder="Enter your full name" />
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default NameField;
