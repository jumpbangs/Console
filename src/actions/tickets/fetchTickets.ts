import { createAction } from 'redux-actions';

import * as ticketService from 'services/tickets';
import { TicketResponseData } from 'domain/response/Tickets';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_TICKETS = 'FETCH_TICKETS';
export type FETCH_TICKETS_ = typeof FETCH_TICKETS;

export const FETCH_TICKETS_PENDING = 'FETCH_TICKETS_PENDING';
export type FETCH_TICKETS_PENDING = typeof FETCH_TICKETS_PENDING;

export const FETCH_TICKETS_REJECTED = 'FETCH_TICKETS_REJECTED';
export type FETCH_TICKETS_REJECTED = typeof FETCH_TICKETS_REJECTED;

export const FETCH_TICKETS_FULFILLED = 'FETCH_TICKETS_FULFILLED';
export type FETCH_TICKETS_FULFILLED = typeof FETCH_TICKETS_FULFILLED;

// Types for action.
export type FetchTicketsPending = Action<FETCH_TICKETS_PENDING>;
export type FetchTicketsRejected = ActionWithError<FETCH_TICKETS_REJECTED, any>;
export type FetchTicketsFulfilled = ActionWithPayload<FETCH_TICKETS_FULFILLED, TicketResponseData>;

export type FetchTicketsActions = FetchTicketsPending | FetchTicketsRejected | FetchTicketsFulfilled;

// Action creators.
export const fetchTickets = createAction(FETCH_TICKETS, ticketService.fetchTickets);
