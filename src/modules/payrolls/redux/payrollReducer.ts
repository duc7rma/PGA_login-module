import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPayroll } from 'models/payroll'

export interface PayrollState {
  listPayrolls: IPayroll[],
  filters: {
    status: string;
    fromDate: string;
    toDate: string;
    invoice: string;
  };
}
  //! ACTIONS

export const setListPayrolls = createCustomAction('SET_LIST_PAYROLLS', (data: IPayroll[]) => ({
  data,
}));

export const  changeStatus = createCustomAction('CHANGE_PAYROLL_STATUS', (data: string) => ({
  data,
}));
export const changeInvoice = createCustomAction('CHANGE_PAYROLL_INVOICE', (data: string) => ({
  data,
}));
export const changeFromDate = createCustomAction('CHANGE_PAYROLL_FROM_DATE', (data: string) => ({
  data,
}));
export const changeToDate = createCustomAction('CHANGE_PAYROLL_TO_DATE', (data: string) => ({
  data,
}));
export const clearFilter = createCustomAction('CLEAR_ALL_FILTERS', (allFilter: {}) => ({
  allFilter,
}));
export const deletePayroll = createCustomAction('DELETE_PAYROLL', (payrollId: string) => ({
  payrollId,
}));



const actions = { setListPayrolls, changeStatus, changeFromDate, changeToDate,changeInvoice, clearFilter, deletePayroll};
  
type ActionLocal = ActionType<typeof actions>;
  
  //! REDUCER
export default function payrollReducer(
  state: PayrollState = {
    listPayrolls: [],
    filters: {
      status: '',
      fromDate: '',
      toDate: '',
      invoice: ''
    }
  }, action: ActionLocal) {
  switch (action.type) {
    case getType(setListPayrolls): {
      const listPayrolls = action.data
      return { 
        ...state, 
        listPayrolls: listPayrolls,
        filters: {
          status: 'Status',
          fromDate: '',
          toDate: '',
          invoice: ''
        }
      }                        
    }

    case getType(changeStatus): {
      const status = action.data
      return { 
        ...state, 
        filters: {
          ...state.filters,
          status: status
        }
      }                      
    }

    case getType(changeFromDate): {
      const fromDate = action.data
      return { 
        ...state, 
        filters: {
          ...state.filters,
          fromDate: fromDate
        }
      }                      
    }

    case getType(changeToDate): {
      const toDate = action.data
      return { ...state, 
        filters: {
          ...state.filters,
          toDate: toDate
        }
      }                      
    }

    case getType(changeInvoice): {
      const invoice = action.data
      return { ...state, 
        filters: {
          ...state.filters,
          invoice: invoice
        }
      }                      
    }

    case getType(clearFilter): {
      const allFilter = action.allFilter
      return { ...state, 
        filters: {
          ...allFilter,
          status: 'Status'
        }
      }                      
    }

    case getType(deletePayroll): {
      const newListPayrolls = state.listPayrolls.filter((item) => {
        return item.payroll_id !== action.payrollId;
      });
      return {
        ...state,
        listPayrolls: newListPayrolls,
      };                    
    }
            
    default:
      return state;
  
  }
}

   