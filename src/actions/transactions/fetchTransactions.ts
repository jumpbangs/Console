import { createAction } from 'redux-actions';

import * as transactionService from 'services/transaction';
import { TransactionResponse } from 'domain/response/Transaction';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_TRANSACTION = 'FETCH_TRANSACTION';
export type FETCH_TRANSACTION_ = typeof FETCH_TRANSACTION;

export const FETCH_TRANSACTION_PENDING = 'FETCH_TRANSACTION_PENDING';
export type FETCH_TRANSACTION_PENDING = typeof FETCH_TRANSACTION_PENDING;

export const FETCH_TRANSACTION_REJECTED = 'FETCH_TRANSACTION_REJECTED';
export type FETCH_TRANSACTION_REJECTED = typeof FETCH_TRANSACTION_REJECTED;

export const FETCH_TRANSACTION_FULFILLED = 'FETCH_TRANSACTION_FULFILLED';
export type FETCH_TRANSACTION_FULFILLED = typeof FETCH_TRANSACTION_FULFILLED;

// Types for action.
export type FetchTransactionPending = Action<FETCH_TRANSACTION_PENDING>;
export type FetchTransactionRejected = ActionWithError<FETCH_TRANSACTION_REJECTED, any>;
export type FetchTransactionFulfilled = ActionWithPayload<FETCH_TRANSACTION_FULFILLED, TransactionResponse>;

export type FetchTransactionsActions = FetchTransactionPending | FetchTransactionRejected | FetchTransactionFulfilled;

// Action creators.
export const fetchTransactions = createAction(FETCH_TRANSACTION, transactionService.fetchTransactions);
