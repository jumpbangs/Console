import { createAction } from 'redux-actions';

import * as ticketServices from 'services/tickets';
import { TicketDetailsPayload } from 'domain/misc/tickets/Ticket';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Fetch device id.
export const FETCH_TICKET_BY_ID = 'FETCH_TICKET_BY_ID';
export type FETCH_TICKET_BY_ID_ = typeof FETCH_TICKET_BY_ID;

export const FETCH_TICKET_BY_ID_PENDING = 'FETCH_TICKET_BY_ID_PENDING';
export type FETCH_TICKET_BY_ID_PENDING = typeof FETCH_TICKET_BY_ID_PENDING;

export const FETCH_TICKET_BY_ID_REJECTED = 'FETCH_TICKET_BY_ID_REJECTED';
export type FETCH_TICKET_BY_ID_REJECTED = typeof FETCH_TICKET_BY_ID_REJECTED;

export const FETCH_TICKET_BY_ID_FULFILLED = 'FETCH_TICKET_BY_ID_FULFILLED';
export type FETCH_TICKET_BY_ID_FULFILLED = typeof FETCH_TICKET_BY_ID_FULFILLED;

export type FetchTicketByIdPending = Action<FETCH_TICKET_BY_ID_PENDING>;
export type FetchTicketByIdRejected = ActionWithError<FETCH_TICKET_BY_ID_REJECTED, any>;
export type FetchTicketByIdFulfilled = ActionWithPayload<FETCH_TICKET_BY_ID_FULFILLED, TicketDetailsPayload>;

export type FetchTicketByIdActions = FetchTicketByIdPending | FetchTicketByIdRejected | FetchTicketByIdFulfilled;

// Action Creator
export const fetchTicketById = createAction(FETCH_TICKET_BY_ID, ticketServices.fetchTicketDetailById);
