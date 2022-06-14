import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import SignUpForm from 'modules/auth/components/SignupForm/SignupForm';
import logo from 'assets/images/logo-pg.png';
import { ISignUpParams } from 'models/auth';
import { handleSignUpLocationsAPI, handleRegisterAPI } from 'server/userServer';
import './SignUpPage.css';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'configs/routes';
import { getErrorMessageResponse } from 'utils';

function SigUpPage() {
  const [isLoading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const getLocation = useCallback(async () => {
    setLoading(true);
    const res = await handleSignUpLocationsAPI();
    setLoading(false);

    if (res?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations(res?.data);
      return;
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const onSignUp = async (values: ISignUpParams) => {
    setErrorMessage('');
    setLoading(true);

    const res = await handleRegisterAPI(values);

    setLoading(false);
    console.log(res);

    if (res.code === RESPONSE_STATUS_SUCCESS) {
      console.log(res.data);
      alert('Chúc mừng bạn đã đăng ký thành công!');
      navigate(ROUTES.login);
      return;
    }

    if (res?.error) {
      setErrorMessage(getErrorMessageResponse(res));
    }
  };

  return (
    <div className="container form-login">
      <img src={logo} alt="" />
      <SignUpForm onSignUp={onSignUp} isLoading={isLoading} errorMessage={errorMessage} locations={locations} />
    </div>
  );
}

export default SigUpPage;
