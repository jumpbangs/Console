import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';
import { PaginationOptions } from 'domain/request/Pagination';

export const SET_TRANSACTION_PAGINATION_OPTION = 'SET_TRANSACTION_PAGINATION_OPTION';
export type SET_TRANSACTION_PAGINATION_OPTION = typeof SET_TRANSACTION_PAGINATION_OPTION;

export type SetTransactionPaginationActions = ActionWithPayload<SET_TRANSACTION_PAGINATION_OPTION, PaginationOptions>;

// Action creators.
export const setTransactionPagination = createAction(SET_TRANSACTION_PAGINATION_OPTION);
