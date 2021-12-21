import AppActions from 'domain/actions/AppActions';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_COUNTER_COUNT } from 'constants/appConstants';
import { SET_TRANSACTION_PAGINATION_OPTION } from 'actions/transactions/transactionPagination';
import { TransactionPagination as TransactionPaginationState } from 'domain/states/data/transactions/TransactionPagination';

const INITIAL_STATE: TransactionPaginationState = {
  ending_before: '',
  starting_after: '',
  counter: DEFAULT_COUNTER_COUNT,
  limit: DEFAULT_PAGINATION_LIMIT,
};

/**
 * Transaction Pagination Reducer.
 *
 * @param {TransactionPaginationState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TransactionPaginationState}
 */
export default function (
  state: TransactionPaginationState = INITIAL_STATE,
  action: AppActions
): TransactionPaginationState {
  switch (action.type) {
    case SET_TRANSACTION_PAGINATION_OPTION:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
