import React from 'react';
import { IPayroll } from 'models/payroll';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './Payroll.css';
import { deletePayroll } from 'modules/payrolls/redux/payrollReducer';
import { useDispatch } from 'react-redux';

interface Props {
  payroll: IPayroll;
}

function Payroll(props: Props) {
  const { payroll } = props;
  const dispatch = useDispatch();

  const handleRemovePayroll = (id: string) => {
    dispatch(deletePayroll(id));
  };

  return (
    <tr>
      <td>{payroll.async_status}</td>
      <br />
      <td>{moment(payroll.time_created).format('ll')}</td>
      <td>{payroll.currency}</td>
      <td>{payroll.payroll_id}</td>
      <td>
        <button className="view-details" type="button">
          View Details
        </button>
      </td>
      <td>
        <button onClick={() => handleRemovePayroll(payroll.payroll_id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}

export default Payroll;
