import React from 'react';
import { useState } from 'react';
import { ISignUpValidation, ISignUpParams, ILocationParams, IGenderParams } from 'models/auth';
import { validSignUp } from 'modules/auth/utils';
import './SignUpForm.css';
import { FormattedMessage } from 'react-intl';
import { validateSignUp } from './../../utils';
import { GENDERS } from 'configs/gender';
import { urlSignUpLocationPidAPI } from 'utils/constants';
import axios from 'axios';

interface Props {
  onSignUp(values: ISignUpParams): void;
  isLoading: boolean;
  errorMessage: string;
  locations: Array<ILocationParams>;
}

function SignUpForm(props: Props) {
  const { onSignUp, isLoading, errorMessage, locations } = props;

  //! define states
  const [formValues, setFormValues] = useState<ISignUpParams>({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: '',
  });
  const [validate, setValidate] = useState<ISignUpValidation>();
  const [states, setStates] = useState([]);

  //! define handle functions
  const handleOnSubmit = () => {
    const dataValidate = validateSignUp(formValues);

    setValidate(dataValidate);

    if (!validSignUp(dataValidate)) {
      return;
    }

    onSignUp(formValues);
  };

  const renderGender = () => {
    const arrGender: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- Select your gender --{' '}
      </option>,
    ];
    GENDERS.map((gender: IGenderParams, index: number) => {
      arrGender.push(
        <option value={gender.value} key={index}>
          {gender.label}
        </option>,
      );
    });
    return arrGender;
  };

  const renderRegion = () => {
    const arrRegion: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- Select your country --{' '}
      </option>,
    ];
    locations.map((location: ILocationParams, index: number) => {
      arrRegion.push(
        <option value={location.id} key={index}>
          {location.name}
        </option>,
      );
    });
    return arrRegion;
  };

  const handleChangeRegion = async (id: string) => {
    const resStateAPI = await axios.get(`${urlSignUpLocationPidAPI}+${id}`);
    // const resStateAPI = await axios.get('http://api.training.div3.pgtest.co/api/v1/location?pid=242');

    setFormValues({ ...formValues, region: id });
    setStates(resStateAPI.data.data);
  };

  const renderState = () => {
    const arrState: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- Select your city --{' '}
      </option>,
    ];
    states.map((state: ILocationParams, index: number) => {
      arrState.push(
        <option value={state.id} key={index}>
          {state.name}
        </option>,
      );
    });
    return arrState;
  };

  return (
    <form
      autoComplete="off"
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
            <FormattedMessage id="emailRequire" />
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
            <FormattedMessage id="passwordRequire" />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputRepeatPassword" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputRepeatPassword"
          value={formValues.repeatPassword}
          onChange={(e) => setFormValues({ ...formValues, repeatPassword: e.target.value })}
        />

        {!!validate?.repeatPassword && (
          <small className="text-danger">
            <FormattedMessage id="matchPasswordInvalid" />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputName" className="form-label">
          <FormattedMessage id="name" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          value={formValues.name}
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        />

        {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id="nameRequire" />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="selectGender" className="form-label">
          <FormattedMessage id="gender" />
        </label>
        <select
          className="form-control"
          id="selectGender"
          value={formValues.gender}
          onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
        >
          {renderGender()}
        </select>

        {!!validate?.gender && (
          <small className="text-danger">
            <FormattedMessage id="genderRequire" />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label htmlFor="selectRegion" className="form-label">
          <FormattedMessage id="region" />
        </label>
        <select
          className="form-control"
          id="selectRegion"
          value={formValues.region}
          // onChange={(e) => setFormValues({ ...formValues, region: e.target.value })}
          onChange={(e) => handleChangeRegion(e.target.value)}
        >
          {renderRegion()}
        </select>

        {!!validate?.region && (
          <small className="text-danger">
            <FormattedMessage id="regionRequire" />
          </small>
        )}
      </div>

      {/* {formValues.region ? ( */}
      <div className="col-md-12">
        <label htmlFor="selectState" className="form-label">
          <FormattedMessage id="state" />
        </label>
        <select
          className="form-control"
          id="selectState"
          value={formValues.state}
          onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
        >
          {renderState()}
        </select>

        {!!validate?.state && (
          <small className="text-danger">
            <FormattedMessage id="stateRequire" />
          </small>
        )}
      </div>
      {/* ) : null} */}

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={isLoading}
          >
            {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
