import AppActions from 'domain/actions/AppActions';
import { SET_TRANSACTION_DETAILS } from 'actions/transactions/setTransactionDetails';
import { TransactionDetails as TransactionDetailState } from 'domain/states/data/transactions/TransactionDetails';

export const INITIAL_STATE: TransactionDetailState = null;

/**
 * Ticket Reducer.
 *
 * @param {TransactionDetailState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TransactionDetailState}
 */
export default function (state: TransactionDetailState = INITIAL_STATE, action: AppActions): TransactionDetailState {
  switch (action.type) {
    case SET_TRANSACTION_DETAILS:
      return action.payload;

    default:
      return state;
  }
}
