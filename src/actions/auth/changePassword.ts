import { createAction } from 'redux-actions';

import * as authService from 'services/auth';
import { AuthResponse } from 'domain/response/Auth';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export type CHANGE_PASSWORD_ = typeof CHANGE_PASSWORD;

export const CHANGE_PASSWORD_PENDING = 'CHANGE_PASSWORD_PENDING';
export type CHANGE_PASSWORD_PENDING = typeof CHANGE_PASSWORD_PENDING;

export const CHANGE_PASSWORD_REJECTED = 'CHANGE_PASSWORD_REJECTED';
export type CHANGE_PASSWORD_REJECTED = typeof CHANGE_PASSWORD_REJECTED;

export const CHANGE_PASSWORD_FULFILLED = 'CHANGE_PASSWORD_FULFILLED';
export type CHANGE_PASSWORD_FULFILLED = typeof CHANGE_PASSWORD_FULFILLED;

// Types for action.
export type ChangePasswordPending = Action<CHANGE_PASSWORD_PENDING>;
export type ChangePasswordRejected = ActionWithError<CHANGE_PASSWORD_REJECTED, any>;
export type ChangePasswordFulfilled = ActionWithPayload<CHANGE_PASSWORD_FULFILLED, AuthResponse>;

export type ChangePasswordActions = ChangePasswordPending | ChangePasswordRejected | ChangePasswordFulfilled;

// Action creators.
export const changePassword = createAction(CHANGE_PASSWORD, authService.changePassword);
