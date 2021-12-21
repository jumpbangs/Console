import { createAction } from 'redux-actions';

import * as homeService from 'services/home';
import { ChartResponse } from 'domain/response/Chart';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_TOTAL_TICKETS = 'FETCH_TOTAL_TICKETS';
export type FETCH_TOTAL_TICKETS_ = typeof FETCH_TOTAL_TICKETS;

export const FETCH_TOTAL_TICKETS_PENDING = 'FETCH_TOTAL_TICKETS_PENDING';
export type FETCH_TOTAL_TICKETS_PENDING = typeof FETCH_TOTAL_TICKETS_PENDING;

export const FETCH_TOTAL_TICKETS_REJECTED = 'FETCH_TOTAL_TICKETS_REJECTED';
export type FETCH_TOTAL_TICKETS_REJECTED = typeof FETCH_TOTAL_TICKETS_REJECTED;

export const FETCH_TOTAL_TICKETS_FULFILLED = 'FETCH_TOTAL_TICKETS_FULFILLED';
export type FETCH_TOTAL_TICKETS_FULFILLED = typeof FETCH_TOTAL_TICKETS_FULFILLED;

export type FetchTotalTicketsPending = Action<FETCH_TOTAL_TICKETS_PENDING>;
export type FetchTotalTicketsRejected = ActionWithError<FETCH_TOTAL_TICKETS_REJECTED, any>;
export type FetchTotalTicketsFulfilled = ActionWithPayload<FETCH_TOTAL_TICKETS_FULFILLED, ChartResponse>;

export type FetchTotalTicketsActions =
  | FetchTotalTicketsPending
  | FetchTotalTicketsRejected
  | FetchTotalTicketsFulfilled;

export const fetchTotalTickets = createAction(FETCH_TOTAL_TICKETS, homeService.fetchChartData);
