import { createAction } from 'redux-actions';

import * as accountService from 'services/accounts';
import { AccountResponse } from 'domain/response/Account';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_ACCOUNT_BY_ID = 'FETCH_ACCOUNT_BY_ID';
export type FETCH_ACCOUNT_BY_ID_ = typeof FETCH_ACCOUNT_BY_ID;

export const FETCH_ACCOUNT_BY_ID_PENDING = 'FETCH_ACCOUNT_BY_ID_PENDING';
export type FETCH_ACCOUNT_BY_ID_PENDING = typeof FETCH_ACCOUNT_BY_ID_PENDING;

export const FETCH_ACCOUNT_BY_ID_REJECTED = 'FETCH_ACCOUNT_BY_ID_REJECTED';
export type FETCH_ACCOUNT_BY_ID_REJECTED = typeof FETCH_ACCOUNT_BY_ID_REJECTED;

export const FETCH_ACCOUNT_BY_ID_FULFILLED = 'FETCH_ACCOUNT_BY_ID_FULFILLED';
export type FETCH_ACCOUNT_BY_ID_FULFILLED = typeof FETCH_ACCOUNT_BY_ID_FULFILLED;

// Types for action.
export type FetchAccountByIdPending = Action<FETCH_ACCOUNT_BY_ID_PENDING>;
export type FetchAccountByIdRejected = ActionWithError<FETCH_ACCOUNT_BY_ID_REJECTED, any>;
export type FetchAccountByIdFulfilled = ActionWithPayload<FETCH_ACCOUNT_BY_ID_FULFILLED, AccountResponse>;

export type FetchAccountByIdActions = FetchAccountByIdPending | FetchAccountByIdRejected | FetchAccountByIdFulfilled;

// Action creators.
export const fetchAccountById = createAction(FETCH_ACCOUNT_BY_ID, accountService.fetchAccountById);
