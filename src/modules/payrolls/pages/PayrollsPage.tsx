import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import DataAPI from 'modules/payrolls/data.json';
import { setListPayrolls } from 'modules/payrolls/redux/payrollReducer';
import './PayrollPage.css';
import Filters from 'modules/payrolls/components/Filters/Filters';
import Payroll from 'modules/payrolls/components/Payroll/Payroll';
import { MAX_PAYROLL_PER_PAGE } from 'modules/intl/constants';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
// import PaginatedItems from 'modules/payrolls/components/Pagination/Pagination';

function PayrollsPage() {
  const dispatch = useDispatch();

  const [numberPage, setNumberPage] = useState(1);
  // //! replace async_status = status
  useEffect(() => {
    const dataAPI = DataAPI.payrolls;
    const newDataAPI = dataAPI.map((payroll) => {
      if (payroll.received) {
        return { ...payroll, async_status: 'Received' };
      }

      if (payroll.matched || payroll.approved) {
        return { ...payroll, async_status: 'Processing' };
      }

      if (payroll.fulfilled) {
        return { ...payroll, async_status: 'Fulfilled' };
      }

      if (payroll.canceled) {
        return { ...payroll, async_status: 'Canceled' };
      }

      return { ...payroll, async_status: 'Pending' };
    });

    dispatch(setListPayrolls(newDataAPI));
  }, []);

  //!
  const { status, fromDate, toDate, invoice } = useSelector((state: AppState) => ({
    status: state.payroll.filters.status,
    fromDate: moment(state.payroll.filters.fromDate).unix(),
    toDate: moment(state.payroll.filters.toDate).unix(),
    invoice: state.payroll.filters.invoice,
  }));

  // //! handle Filters
  const newPayrollAfterFilter = useSelector((state: AppState) => {
    const newPayrollAfterFilter = state.payroll.listPayrolls.filter((filter) => {
      const time = moment(filter.time_created).unix();

      if (fromDate && toDate) {
        if (state.payroll.filters.status !== 'Status') {
          return (
            filter.async_status === status && filter.payroll_id.includes(invoice) && time >= fromDate && time <= toDate
          );
        } else {
          return (
            state.payroll.listPayrolls && filter.payroll_id.includes(invoice) && time >= fromDate && time <= toDate
          );
        }
      } else {
        if (state.payroll.filters.status !== 'Status') {
          return filter.async_status === status && filter.payroll_id.includes(invoice);
        } else {
          return state.payroll.listPayrolls && filter.payroll_id.includes(invoice);
        }
      }
    });
    return newPayrollAfterFilter;
  });

  const handlePrevPage = () => {
    setNumberPage(numberPage - 1);
  };

  const handleNextPage = () => {
    setNumberPage(numberPage + 1);
  };

  return (
    <>
      <h1>Payroll Transactions List</h1>
      <Filters />
      <table>
        <tr>
          <th>Status</th>
          <br />
          <th>Date</th>
          <th>Currency</th>
          <th>Invoice #</th>
        </tr>

        {newPayrollAfterFilter.map((payroll, index: number) => {
          if (index >= (numberPage - 1) * MAX_PAYROLL_PER_PAGE && index <= numberPage * MAX_PAYROLL_PER_PAGE - 1)
            return <Payroll key={index} payroll={payroll} />;
        })}
      </table>

      {/* <div id="container">
        <PaginatedItems itemsPerPage={MAX_PAYROLL_PER_PAGE} />
      </div> */}

      <div className="btn-switch-page">
        <button className="btn-prev" disabled={numberPage <= 1 ? true : false} onClick={() => handlePrevPage()}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>

        <button className="btn-next" disabled={numberPage >= 42 ? true : false} onClick={() => handleNextPage()}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </>
  );
}

export default PayrollsPage;
