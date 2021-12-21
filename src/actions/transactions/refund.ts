import { createAction } from 'redux-actions';

import RefundResponse from 'domain/response/Refund';
import * as transactionService from 'services/transaction';
import { ActionWithPayload, Action, ActionWithError } from 'domain/base';

export const SET_REFUND_MODAL_STATUS = 'SET_REFUND_MODAL_STATUS';
export type SET_REFUND_MODAL_STATUS = typeof SET_REFUND_MODAL_STATUS;

export const REFUND_TRANSACTION = 'REFUND_TRANSACTION';
export type REFUND_TRANSACTION = typeof REFUND_TRANSACTION;

export const REFUND_TRANSACTION_PENDING = 'REFUND_TRANSACTION_PENDING';
export type REFUND_TRANSACTION_PENDING = typeof REFUND_TRANSACTION_PENDING;

export const REFUND_TRANSACTION_REJECTED = 'REFUND_TRANSACTION_REJECTED';
export type REFUND_TRANSACTION_REJECTED = typeof REFUND_TRANSACTION_REJECTED;

export const REFUND_TRANSACTION_FULFILLED = 'REFUND_TRANSACTION_FULFILLED';
export type REFUND_TRANSACTION_FULFILLED = typeof REFUND_TRANSACTION_FULFILLED;

export type SetRefundModalStatus = ActionWithPayload<SET_REFUND_MODAL_STATUS, boolean>;

export type RefundTransactionPending = Action<REFUND_TRANSACTION_PENDING>;
export type RefundTransactionRejected = ActionWithError<REFUND_TRANSACTION_REJECTED, any>;
export type RefundTransactionFulfilled = ActionWithPayload<REFUND_TRANSACTION_FULFILLED, RefundResponse>;

export type RefundTransactionActions =
  | RefundTransactionPending
  | RefundTransactionRejected
  | RefundTransactionFulfilled;

export type RefundActions = SetRefundModalStatus | RefundTransactionActions;

// Action creators.
export const setRefundModalStatus = createAction(SET_REFUND_MODAL_STATUS);
export const refundTransaction = createAction(REFUND_TRANSACTION, transactionService.refundTransaction);
