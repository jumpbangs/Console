import Status from 'enums/Status';
import AppActions from 'domain/actions/AppActions';
import RefundResponse from 'domain/response/Refund';
import { TransactionResponseData } from 'domain/response/Transaction';
import {
  FETCH_TRANSACTION_PENDING,
  FETCH_TRANSACTION_REJECTED,
  FETCH_TRANSACTION_FULFILLED,
} from 'actions/transactions/fetchTransactions';
import {
  REFUND_TRANSACTION_PENDING,
  REFUND_TRANSACTION_REJECTED,
  REFUND_TRANSACTION_FULFILLED,
} from 'actions/transactions/refund';
import { Transactions as TransactionState } from 'domain/states/data/transactions/Transactions';

export const INITIAL_STATE: TransactionState = {
  data: [],
  has_more: false,
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
    case FETCH_TRANSACTION_FULFILLED:
      return action.payload;

    case REFUND_TRANSACTION_FULFILLED:
      return {
        ...state,
        data: getUpdatedTransactions(state, action.payload),
      };

    case FETCH_TRANSACTION_PENDING:
    case REFUND_TRANSACTION_PENDING:
    case FETCH_TRANSACTION_REJECTED:
    case REFUND_TRANSACTION_REJECTED:
      return state;

    default:
      return state;
  }
}

/**
 * Get updated transaction after it gets refunded.
 *
 * @param {AppState} state
 * @param {RefundResponse} payload
 *
 * @return {TransactionState}
 */
const getUpdatedTransactions = (state: TransactionState, payload: RefundResponse): TransactionResponseData[] => {
  const transactions = state.data;

  return transactions.map((transaction) => {
    if (transaction.id === payload.transaction) {
      return {
        ...transaction,
        created: payload.created,
        status: getRefundedStatus(transaction, payload),
        refunded_amount: transaction?.refunded_amount + payload?.amount,
      };
    }

    return transaction;
  });
};

/**
 * Update status after full refund.
 *
 * @param {TransactionResponseData} transaction
 * @param {RefundResponse} payload
 */
export const getRefundedStatus = (transaction: TransactionResponseData, payload: RefundResponse) => {
  const refundedAmount = payload.amount;
  const totalRefund = transaction.refunded_amount + refundedAmount;

  if (totalRefund === transaction.amount) {
    return Status.REFUNDED;
  }

  return Status.PARTIAL;
};
