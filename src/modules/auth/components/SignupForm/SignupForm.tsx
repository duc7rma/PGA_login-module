import React from 'react';
import { ISignUpParams, ILocationParams } from 'models/auth';
import './SignUpForm.css';
import { Form, Formik } from 'formik';
import { GENDERS } from 'configs/gender';
import { SignupSchema } from 'modules/auth/utils';
import { useState, useEffect } from 'react';
import { urlSignUpLocationPidAPI } from 'utils/constants';
import axios from 'axios';

import EmailField from 'modules/components/Fields/EmailField';
import PasswordField from 'modules/components/Fields/PasswordField';
import RepeatPasswordField from 'modules/components/Fields/RepeatPasswordField';
import GenderField from 'modules/components/Fields/GenderField';
import NameField from 'modules/components/Fields/NameField';
import RegionField from 'modules/components/Fields/RegionField';
import StateField from 'modules/components/Fields/StateField';
import ButtonRegister from 'modules/components/Buttons/ButtonRegister/ButtonRegister';
interface Props {
  onSignUp(values: ISignUpParams): void;
  isLoading: boolean;
  errorMessage: string;
  locations: Array<ILocationParams>;
}

function SignUpForm(props: Props) {
  const [states, setStates] = useState([]);
  const { onSignUp, isLoading, errorMessage, locations } = props;

  const handleChangeRegion = async (id: number | string) => {
    const resStateAPI = await axios.get(`${urlSignUpLocationPidAPI}+${id}`);
    setStates(resStateAPI.data.data);
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
    <Formik
      initialValues={{
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: '',
        state: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSignUp(values);
      }}
      validationSchema={SignupSchema}
    >
      {({ touched, errors, values, handleChange }) => {
        useEffect(() => {
          handleChangeRegion(values.region);
        }, [values.region]);

        return (
          <Form className=" form-signup row g-3 needs-validation">
            {!!errorMessage && (
              <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                {errorMessage}
              </div>
            )}
            <EmailField error={errors.email} isTouched={touched.email} />
            <PasswordField error={errors.password} isTouched={touched.password} />
            <RepeatPasswordField error={errors.repeatPassword} isTouched={touched.repeatPassword} />
            <NameField error={errors.name} isTouched={touched.name} />
            <GenderField
              error={errors.gender}
              isTouched={touched.gender}
              genders={GENDERS}
              value={values.gender}
              onChange={handleChange}
            />
            <RegionField
              error={errors.region}
              isTouched={touched.region}
              value={values.region}
              onChange={handleChange}
              renderRegion={renderRegion}
            />
            <StateField
              error={errors.state}
              isTouched={touched.region}
              value={values.state}
              onChange={handleChange}
              renderState={renderState}
            />

            <ButtonRegister isLoading={isLoading} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignUpForm;
