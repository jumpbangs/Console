import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';
import { PaginationOptions } from 'domain/request/Pagination';

export const SET_TICKET_PAGINATION_OPTION = 'SET_TICKET_PAGINATION_OPTION';
export type SET_TICKET_PAGINATION_OPTION = typeof SET_TICKET_PAGINATION_OPTION;

export type SetTicketPaginationActions = ActionWithPayload<SET_TICKET_PAGINATION_OPTION, PaginationOptions>;

// Action creators.
export const setTicketPagination = createAction(SET_TICKET_PAGINATION_OPTION);
