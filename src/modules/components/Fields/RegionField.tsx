import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
  value: number | string;
  onChange(e: React.ChangeEvent<any>): void;
  renderRegion: () => JSX.Element[];
}

function RegionField(props: Props) {
  const { error, isTouched, onChange, value, renderRegion } = props;

  return (
    <div className="col-md-12">
      <label htmlFor="selectRegion" className="form-label">
        <FormattedMessage id="region" />
      </label>
      <Field
        as="select"
        className="form-control"
        id="selectRegion"
        name="region"
        value={value}
        onChange={onChange}

        // onChange={(e) => handleChangeRegion(e.target.value)}
      >
        {renderRegion()}
      </Field>
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default RegionField;
