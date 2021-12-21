import { createAction } from 'redux-actions';

import * as homeService from 'services/home';
import { ChartResponse } from 'domain/response/Chart';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_TOTAL_TRANSACTION = 'FETCH_TOTAL_TRANSACTION';
export type FETCH_TOTAL_TRANSACTION_ = typeof FETCH_TOTAL_TRANSACTION;

export const FETCH_TOTAL_TRANSACTION_PENDING = 'FETCH_TOTAL_TRANSACTION_PENDING';
export type FETCH_TOTAL_TRANSACTION_PENDING = typeof FETCH_TOTAL_TRANSACTION_PENDING;

export const FETCH_TOTAL_TRANSACTION_REJECTED = 'FETCH_TOTAL_TRANSACTION_REJECTED';
export type FETCH_TOTAL_TRANSACTION_REJECTED = typeof FETCH_TOTAL_TRANSACTION_REJECTED;

export const FETCH_TOTAL_TRANSACTION_FULFILLED = 'FETCH_TOTAL_TRANSACTION_FULFILLED';
export type FETCH_TOTAL_TRANSACTION_FULFILLED = typeof FETCH_TOTAL_TRANSACTION_FULFILLED;

export type FetchTotalTransactionPending = Action<FETCH_TOTAL_TRANSACTION_PENDING>;
export type FetchTotalTransactionRejected = ActionWithError<FETCH_TOTAL_TRANSACTION_REJECTED, any>;
export type FetchTotalTransactionFulfilled = ActionWithPayload<FETCH_TOTAL_TRANSACTION_FULFILLED, ChartResponse>;

export type FetchTotalTransactionActions =
  | FetchTotalTransactionPending
  | FetchTotalTransactionRejected
  | FetchTotalTransactionFulfilled;

export const fetchTotalTransactionCount = createAction(FETCH_TOTAL_TRANSACTION, homeService.fetchChartData);
