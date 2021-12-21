import { createAction } from 'redux-actions';

import * as homeService from 'services/home';
import { ChartResponse } from 'domain/response/Chart';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_TOTAL_SALES = 'FETCH_TOTAL_SALES';
export type FETCH_TOTAL_SALES_ = typeof FETCH_TOTAL_SALES;

export const FETCH_TOTAL_SALES_PENDING = 'FETCH_TOTAL_SALES_PENDING';
export type FETCH_TOTAL_SALES_PENDING = typeof FETCH_TOTAL_SALES_PENDING;

export const FETCH_TOTAL_SALES_REJECTED = 'FETCH_TOTAL_SALES_REJECTED';
export type FETCH_TOTAL_SALES_REJECTED = typeof FETCH_TOTAL_SALES_REJECTED;

export const FETCH_TOTAL_SALES_FULFILLED = 'FETCH_TOTAL_SALES_FULFILLED';
export type FETCH_TOTAL_SALES_FULFILLED = typeof FETCH_TOTAL_SALES_FULFILLED;

export type FetchTotalSalesPending = Action<FETCH_TOTAL_SALES_PENDING>;
export type FetchTotalSalesRejected = ActionWithError<FETCH_TOTAL_SALES_REJECTED, any>;
export type FetchTotalSalesFulfilled = ActionWithPayload<FETCH_TOTAL_SALES_FULFILLED, ChartResponse>;

export type FetchTotalSalesActions = FetchTotalSalesPending | FetchTotalSalesRejected | FetchTotalSalesFulfilled;

export const fetchTotalSales = createAction(FETCH_TOTAL_SALES, homeService.fetchChartData);
