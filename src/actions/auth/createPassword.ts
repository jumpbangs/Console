import { createAction } from 'redux-actions';

import * as authService from 'services/auth';
import { AuthResponse } from 'domain/response/Auth';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const CREATE_PASSWORD = 'CREATE_PASSWORD';
export type CREATE_PASSWORD_ = typeof CREATE_PASSWORD;

export const CREATE_PASSWORD_PENDING = 'CREATE_PASSWORD_PENDING';
export type CREATE_PASSWORD_PENDING = typeof CREATE_PASSWORD_PENDING;

export const CREATE_PASSWORD_REJECTED = 'CREATE_PASSWORD_REJECTED';
export type CREATE_PASSWORD_REJECTED = typeof CREATE_PASSWORD_REJECTED;

export const CREATE_PASSWORD_FULFILLED = 'CREATE_PASSWORD_FULFILLED';
export type CREATE_PASSWORD_FULFILLED = typeof CREATE_PASSWORD_FULFILLED;

// Types for action.
export type CreatePasswordPending = Action<CREATE_PASSWORD_PENDING>;
export type CreatePasswordRejected = ActionWithError<CREATE_PASSWORD_REJECTED, any>;
export type CreatePasswordFulfilled = ActionWithPayload<CREATE_PASSWORD_FULFILLED, AuthResponse>;

export type CreatePasswordActions = CreatePasswordPending | CreatePasswordRejected | CreatePasswordFulfilled;

// Action creators.
export const createPassword = createAction(CREATE_PASSWORD, authService.createPassword);
