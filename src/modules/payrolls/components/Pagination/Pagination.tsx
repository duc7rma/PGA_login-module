import { IPayroll } from 'models/payroll';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Payroll from '../Payroll/Payroll';
import DataAPI from 'modules/payrolls/data.json';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import { setListPayrolls } from 'modules/payrolls/redux/payrollReducer';
import moment from 'moment';

interface IPropsPaginatedItems {
  itemsPerPage: number;
  // newPayrollAfterFilter: IPayroll[];
}

function PaginatedItems(props: IPropsPaginatedItems) {
  const dispatch = useDispatch();
  const { itemsPerPage } = props;
  const initialValues: IPayroll[] = [];
  const [currentItems, setCurrentItems] = useState(initialValues);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  //! replace async_status = status
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

  const { status, fromDate, toDate, invoice } = useSelector((state: AppState) => ({
    status: state.payroll.filters.status,
    fromDate: moment(state.payroll.filters.fromDate).unix(),
    toDate: moment(state.payroll.filters.toDate).unix(),
    invoice: state.payroll.filters.invoice,
  }));

  //! handle Filters
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

  // dispatch(setListPayrolls(newPayrollAfterFilter));

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % newPayrollAfterFilter.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  //!
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(newPayrollAfterFilter.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(newPayrollAfterFilter.length / itemsPerPage));
  }, [itemOffset]);

  return (
    <>
      <table>
        <tr>
          <th>Status</th>
          <br />
          <th>Date</th>
          <th>Currency</th>
          <th>Invoice #</th>
        </tr>

        {currentItems.map((payroll, index: number) => {
          return <Payroll key={index} payroll={payroll} />;
        })}
      </table>

      <ReactPaginate
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

export default PaginatedItems;
