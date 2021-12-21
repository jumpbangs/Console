import { createAction } from 'redux-actions';

import * as accountService from 'services/accounts';
import { AccountResponse } from 'domain/response/Account';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Update Location
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export type UPDATE_ACCOUNT_ = typeof UPDATE_ACCOUNT;

export const UPDATE_ACCOUNT_PENDING = 'UPDATE_ACCOUNT_PENDING';
export type UPDATE_ACCOUNT_PENDING = typeof UPDATE_ACCOUNT_PENDING;

export const UPDATE_ACCOUNT_REJECTED = 'UPDATE_ACCOUNT_REJECTED';
export type UPDATE_ACCOUNT_REJECTED = typeof UPDATE_ACCOUNT_REJECTED;

export const UPDATE_ACCOUNT_FULFILLED = 'UPDATE_ACCOUNT_FULFILLED';
export type UPDATE_ACCOUNT_FULFILLED = typeof UPDATE_ACCOUNT_FULFILLED;

// Types for action.
export type UpdateAccountPending = Action<UPDATE_ACCOUNT_PENDING>;
export type UpdateAccountRejected = ActionWithError<UPDATE_ACCOUNT_REJECTED, any>;
export type UpdateAccountFulfilled = ActionWithPayload<UPDATE_ACCOUNT_FULFILLED, AccountResponse>;

export type UpdateAccountActions = UpdateAccountPending | UpdateAccountRejected | UpdateAccountFulfilled;

// Action creators.
export const updateAccount = createAction(UPDATE_ACCOUNT, accountService.updateAccount);
