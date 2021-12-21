import AppActions from 'domain/actions/AppActions';
import TransactionState from 'domain/states/ui/Transaction';
import { SET_REFUND_MODAL_STATUS } from 'actions/transactions/refund';
import { SET_TRANSACTION_MODAL_STATUS } from 'actions/transactions/transactions';
import {
  FETCH_TRANSACTION_PENDING,
  FETCH_TRANSACTION_REJECTED,
  FETCH_TRANSACTION_FULFILLED,
} from 'actions/transactions/fetchTransactions';

const INITIAL_STATE: TransactionState = {
  isRefundModalActive: false,
  isFetchingTransactions: false,
  isTransactionModalActive: false,
};

/**
 * Ticket Reducer.
 *
 * @param {TicketsState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TicketsState}
 */
export default function (state: TransactionState = INITIAL_STATE, action: AppActions): TransactionState {
  switch (action.type) {
    case FETCH_TRANSACTION_PENDING:
      return {
        ...state,
        isFetchingTransactions: true,
      };

    case FETCH_TRANSACTION_REJECTED:
    case FETCH_TRANSACTION_FULFILLED:
      return {
        ...state,
        isFetchingTransactions: false,
      };

    case SET_TRANSACTION_MODAL_STATUS:
      return {
        ...state,
        isTransactionModalActive: action.payload,
      };

    case SET_REFUND_MODAL_STATUS:
      return {
        ...state,
        isRefundModalActive: action.payload,
      };

    default:
      return state;
  }
}
