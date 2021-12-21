import { createAction } from 'redux-actions';

import * as homeService from 'services/home';
import { ChartResponse } from 'domain/response/Chart';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_LINE_CHART_DATA = 'FETCH_LINE_CHART_DATA';
export type FETCH_LINE_CHART_DATA_ = typeof FETCH_LINE_CHART_DATA;

export const FETCH_LINE_CHART_DATA_PENDING = 'FETCH_LINE_CHART_DATA_PENDING';
export type FETCH_LINE_CHART_DATA_PENDING = typeof FETCH_LINE_CHART_DATA_PENDING;

export const FETCH_LINE_CHART_DATA_REJECTED = 'FETCH_LINE_CHART_DATA_REJECTED';
export type FETCH_LINE_CHART_DATA_REJECTED = typeof FETCH_LINE_CHART_DATA_REJECTED;

export const FETCH_LINE_CHART_DATA_FULFILLED = 'FETCH_LINE_CHART_DATA_FULFILLED';
export type FETCH_LINE_CHART_DATA_FULFILLED = typeof FETCH_LINE_CHART_DATA_FULFILLED;

export type FetchChartDataPending = Action<FETCH_LINE_CHART_DATA_PENDING>;
export type FetchChartDataRejected = ActionWithError<FETCH_LINE_CHART_DATA_REJECTED, any>;
export type FetchChartDataFulfilled = ActionWithPayload<FETCH_LINE_CHART_DATA_FULFILLED, ChartResponse>;

export type FetchChartDataActions = FetchChartDataPending | FetchChartDataRejected | FetchChartDataFulfilled;

export const fetchChartData = createAction(FETCH_LINE_CHART_DATA, homeService.fetchChartData);
