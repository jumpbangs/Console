import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';

export const SET_TRANSACTION_MODAL_STATUS = 'SET_TRANSACTION_MODAL_STATUS';
export type SET_TRANSACTION_MODAL_STATUS = typeof SET_TRANSACTION_MODAL_STATUS;

export type SetTransactionModalStatus = ActionWithPayload<SET_TRANSACTION_MODAL_STATUS, boolean>;

export type TransactionActions = SetTransactionModalStatus;

// Action creators.
export const setTransactionModalStatus = createAction(SET_TRANSACTION_MODAL_STATUS);
