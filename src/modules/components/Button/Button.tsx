import React from 'react';
import { FormattedMessage } from 'react-intl';
import './Button.css';

interface Props {
  isLoading: boolean;
}

function Button(props: Props) {
  const { isLoading } = props;
  return (
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
  );
}

export default Button;
