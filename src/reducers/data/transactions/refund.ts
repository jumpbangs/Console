import AppActions from 'domain/actions/AppActions';
import { Refunds as RefundState } from 'domain/states/data/transactions/Refund';
import {
  REFUND_TRANSACTION_PENDING,
  REFUND_TRANSACTION_REJECTED,
  REFUND_TRANSACTION_FULFILLED,
} from 'actions/transactions/refund';

const INITIAL_STATE: RefundState = {
  refunds: [],
  error: '',
};

/**
 * Refund Reducer.
 *
 * @param {RefundState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {RefundState}
 */
export default function (state: RefundState = INITIAL_STATE, action: AppActions): RefundState {
  switch (action.type) {
    case REFUND_TRANSACTION_PENDING:
      return state;

    case REFUND_TRANSACTION_FULFILLED:
      return {
        ...state,
        refunds: [...state.refunds, action.payload],
      };

    case REFUND_TRANSACTION_REJECTED:
      return {
        ...state,
        error: action.payload.message,
      };

    default:
      return state;
  }
}
