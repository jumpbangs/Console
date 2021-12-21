import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';
import { TransactionResponseData } from 'domain/response/Transaction';

export const SET_TRANSACTION_DETAILS = 'SET_TRANSACTION_DETAILS';
export type SET_TRANSACTION_DETAILS = typeof SET_TRANSACTION_DETAILS;

export type SetTransactionDetailsAction = ActionWithPayload<SET_TRANSACTION_DETAILS, TransactionResponseData>;

// Action creators.
export const setTransactionDetails = createAction(SET_TRANSACTION_DETAILS);
