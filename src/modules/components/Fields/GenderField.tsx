import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { IGenderParams } from 'models/auth';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
  genders: IGenderParams[];
  value: string;
  onChange(e: React.ChangeEvent<any>): void;
}

function GenderField(props: Props) {
  const { error, isTouched, genders, value, onChange } = props;

  const renderGender = () => {
    const arrGender: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- Select your gender --{' '}
      </option>,
    ];
    genders.map((gender: IGenderParams, index: number) => {
      arrGender.push(
        <option value={gender.value} key={index}>
          {gender.label}
        </option>,
      );
    });
    return arrGender;
  };

  return (
    <div className="col-md-12">
      <label htmlFor="inputGender" className="form-label">
        <FormattedMessage id="gender" />
      </label>
      <Field as="select" className="form-control" name="gender" id="inputGender" value={value} onChange={onChange}>
        {renderGender()}
      </Field>
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default GenderField;
