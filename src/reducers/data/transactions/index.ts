import { combineReducers } from 'redux';

import refunds from './refund';
import transactions from './transactions';
import transactionDetails from './transactionDetails';
import transactionPagination from './transactionPagination';

/**
 * Combine transactions data reducers.
 */
export default combineReducers({
  refunds,
  transactions,
  transactionDetails,
  transactionPagination,
});
