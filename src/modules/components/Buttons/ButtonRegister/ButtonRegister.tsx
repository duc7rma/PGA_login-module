import React from 'react';
import { FormattedMessage } from 'react-intl';
import './ButtonRegister.css';

interface Props {
  isLoading: boolean;
}

function ButtonRegister(props: Props) {
  const { isLoading } = props;
  return (
    <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
      <div className="col-md-auto">
        <button className="btn-register btn-primary" type="submit" disabled={isLoading}>
          {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
          <FormattedMessage id="register" />
        </button>
      </div>
    </div>
  );
}

export default ButtonRegister;
