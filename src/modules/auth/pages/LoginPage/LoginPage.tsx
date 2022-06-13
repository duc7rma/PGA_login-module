import React from 'react';
import { useState } from 'react';
import LoginForm from 'modules/auth/components/LoginForm/LoginForm';
import logo from 'assets/images/logo-pg.png';
import { ILoginParams } from 'models/auth';
import { handleLoginAPI } from 'server/userServer';
import './LoginPage.css';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onLogin = async (values: ILoginParams) => {
    setErrorMessage('');
    setLoading(true);
    const res = await handleLoginAPI(values.email, values.password);
    console.log(res);
    setLoading(false);

    if (res?.code === RESPONSE_STATUS_SUCCESS) {
      navigate('/home');
      if (values.rememberMe) {
        localStorage.setItem('remember', res.message);
      }
    }

    if (res?.error) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
      <LoginForm onLogin={onLogin} isLoading={isLoading} errorMessage={errorMessage} />
      <div>
        <label style={{ marginRight: '10px' }}>Bạn chưa có tài khoản? </label>
        <a href="/sign-up">
          <FormattedMessage id="register" />
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
