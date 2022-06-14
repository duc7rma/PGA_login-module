import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
  value: number | string;
  onChange(e: React.ChangeEvent<any>): void;
  renderState: () => JSX.Element[];
}

function StateField(props: Props) {
  const { error, isTouched, onChange, renderState, value } = props;

  return (
    <div className="col-md-12">
      <label htmlFor="selectState" className="form-label">
        <FormattedMessage id="state" />
      </label>
      <Field as="select" className="form-control" id="selectState" name="state" value={value} onChange={onChange}>
        {renderState()}
      </Field>
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default StateField;
