import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';
import { TicketDetailsPayload } from 'domain/misc/tickets/Ticket';

export const SET_TICKET_DETAILS = 'SET_TICKET_DETAILS';
export type SET_TICKET_DETAILS = typeof SET_TICKET_DETAILS;

export type SetTicketDetailsActions = ActionWithPayload<SET_TICKET_DETAILS, TicketDetailsPayload>;

// Action creators.
export const setTicketDetails = createAction(SET_TICKET_DETAILS);
