import React from 'react';
import { FormattedMessage } from 'react-intl';
import './ButtonLogin.css';

interface Props {
  isLoading: boolean;
}

function ButtonLogin(props: Props) {
  const { isLoading } = props;
  return (
    <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
      <div className="col-md-auto">
        <button className="btn-login btn-primary" type="submit" disabled={isLoading}>
          {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
          <FormattedMessage id="login" />
        </button>
      </div>
    </div>
  );
}

export default ButtonLogin;
