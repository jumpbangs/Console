import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';

export const SET_TICKET_MODAL_STATUS = 'SET_TICKET_MODAL_STATUS';
export type SET_TICKET_MODAL_STATUS = typeof SET_TICKET_MODAL_STATUS;

export type SetTicketModalStatus = ActionWithPayload<SET_TICKET_MODAL_STATUS, boolean>;

export type TicketActions = SetTicketModalStatus;

// Action creators.
export const setTicketModalStatus = createAction(SET_TICKET_MODAL_STATUS);
