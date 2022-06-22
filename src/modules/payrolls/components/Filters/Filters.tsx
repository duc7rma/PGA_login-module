import {
  changeFromDate,
  changeToDate,
  changeStatus,
  changeInvoice,
  clearFilter,
} from 'modules/payrolls/redux/payrollReducer';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Filter.css';

function Filters() {
  const dispatch = useDispatch();

  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [invoice, setInvoice] = useState('');

  const handleFilterStatus = (statusSelect: string) => {
    dispatch(changeStatus(statusSelect));
    setStatus(statusSelect);
  };

  const handleChangeFromDate = (fromTime: string) => {
    dispatch(changeFromDate(fromTime));
    setFromDate(fromTime);
  };

  const handleChangeToDate = (toTime: string) => {
    dispatch(changeToDate(toTime));
    setToDate(toTime);
  };

  const handleSearchInvoice = (invoiceSearch: string) => {
    dispatch(changeInvoice(invoiceSearch));
    setInvoice(invoiceSearch);
  };

  const handleClearFilters = () => {
    dispatch(
      clearFilter({
        status: 'Status',
        fromDate: '',
        toDate: '',
        invoice: '',
      }),
    );

    setStatus('Status');
    setFromDate('');
    setToDate('');
    setInvoice('');
  };

  return (
    <>
      <table>
        <tr>
          <th className="filter-status">
            <select value={status} name="filters" id="filters" onChange={(e) => handleFilterStatus(e.target.value)}>
              <option value="Status">Status</option>
              <option value="Received">Received</option>
              <option value="Processing">Processing</option>
              <option value="Fulfilled">Fulfilled</option>
              <option value="Canceled">Canceled</option>
              <option value="Pending">Pending</option>
            </select>
          </th>

          <th className="filter-from">
            <label className="label-from">From </label>
            <input value={fromDate} type="date" onChange={(e) => handleChangeFromDate(e.target.value)} />
          </th>

          <th className="filter-to">
            <label className="label-to">To </label>
            <input value={toDate} type="date" onChange={(e) => handleChangeToDate(e.target.value)} />
          </th>

          <th className="filter-invoice">
            <input
              value={invoice}
              onChange={(e) => handleSearchInvoice(e.target.value)}
              placeholder="Invoice#"
              type="text"
            />
          </th>

          <th>
            <button className="btn-apply">Apply</button>
          </th>

          <th>
            <button className="btn-clear" onClick={() => handleClearFilters()}>
              Clear
            </button>
          </th>
        </tr>
      </table>
    </>
  );
}

export default Filters;
