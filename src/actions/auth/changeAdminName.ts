import { createAction } from 'redux-actions';

import * as authService from 'services/auth';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const CHANGE_ADMIN_NAME = 'CHANGE_ADMIN_NAME';
export type CHANGE_ADMIN_NAME_ = typeof CHANGE_ADMIN_NAME;

export const CHANGE_ADMIN_NAME_PENDING = 'CHANGE_ADMIN_NAME_PENDING';
export type CHANGE_ADMIN_NAME_PENDING = typeof CHANGE_ADMIN_NAME_PENDING;

export const CHANGE_ADMIN_NAME_REJECTED = 'CHANGE_ADMIN_NAME_REJECTED';
export type CHANGE_ADMIN_NAME_REJECTED = typeof CHANGE_ADMIN_NAME_REJECTED;

export const CHANGE_ADMIN_NAME_FULFILLED = 'CHANGE_ADMIN_NAME_FULFILLED';
export type CHANGE_ADMIN_NAME_FULFILLED = typeof CHANGE_ADMIN_NAME_FULFILLED;

// Types for action.
export type ChangeAdminNamePending = Action<CHANGE_ADMIN_NAME_PENDING>;
export type ChangeAdminNameRejected = ActionWithError<CHANGE_ADMIN_NAME_REJECTED, any>;
export type ChangeAdminNameFulfilled = ActionWithPayload<CHANGE_ADMIN_NAME_FULFILLED, string>;

export type ChangeAdminNameActions = ChangeAdminNamePending | ChangeAdminNameRejected | ChangeAdminNameFulfilled;

// Action creators.
export const changeAdminName = createAction(CHANGE_ADMIN_NAME, authService.changeAdminName);
