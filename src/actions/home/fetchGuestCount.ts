import { createAction } from 'redux-actions';

import * as homeService from 'services/home';
import { ChartResponse } from 'domain/response/Chart';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_GUEST_COUNT = 'FETCH_GUEST_COUNT';
export type FETCH_GUEST_COUNT_ = typeof FETCH_GUEST_COUNT;

export const FETCH_GUEST_COUNT_PENDING = 'FETCH_GUEST_COUNT_PENDING';
export type FETCH_GUEST_COUNT_PENDING = typeof FETCH_GUEST_COUNT_PENDING;

export const FETCH_GUEST_COUNT_REJECTED = 'FETCH_GUEST_COUNT_REJECTED';
export type FETCH_GUEST_COUNT_REJECTED = typeof FETCH_GUEST_COUNT_REJECTED;

export const FETCH_GUEST_COUNT_FULFILLED = 'FETCH_GUEST_COUNT_FULFILLED';
export type FETCH_GUEST_COUNT_FULFILLED = typeof FETCH_GUEST_COUNT_FULFILLED;

export type FetchGuestCountPending = Action<FETCH_GUEST_COUNT_PENDING>;
export type FetchGuestCountRejected = ActionWithError<FETCH_GUEST_COUNT_REJECTED, any>;
export type FetchGuestCountFulfilled = ActionWithPayload<FETCH_GUEST_COUNT_FULFILLED, ChartResponse>;

export type FetchGuestCountActions = FetchGuestCountPending | FetchGuestCountRejected | FetchGuestCountFulfilled;

export const fetchGuestCount = createAction(FETCH_GUEST_COUNT, homeService.fetchChartData);
