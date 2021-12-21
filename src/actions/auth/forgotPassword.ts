import { createAction } from 'redux-actions';

import * as authService from 'services/auth';

import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export type FORGOT_PASSWORD_ = typeof FORGOT_PASSWORD;

export const FORGOT_PASSWORD_PENDING = 'FORGOT_PASSWORD_PENDING';
export type FORGOT_PASSWORD_PENDING = typeof FORGOT_PASSWORD_PENDING;

export const FORGOT_PASSWORD_REJECTED = 'FORGOT_PASSWORD_REJECTED';
export type FORGOT_PASSWORD_REJECTED = typeof FORGOT_PASSWORD_REJECTED;

export const FORGOT_PASSWORD_FULFILLED = 'FORGOT_PASSWORD_FULFILLED';
export type FORGOT_PASSWORD_FULFILLED = typeof FORGOT_PASSWORD_FULFILLED;

// Types for action.
export type ForgotPasswordPending = Action<FORGOT_PASSWORD_PENDING>;
export type ForgotPasswordRejected = ActionWithError<FORGOT_PASSWORD_REJECTED, any>;
export type ForgotPasswordFulfilled = ActionWithPayload<FORGOT_PASSWORD_FULFILLED, string>;

export type ForgotPasswordActions = ForgotPasswordPending | ForgotPasswordRejected | ForgotPasswordFulfilled;

// Action creators.
export const forgotPassword = createAction(FORGOT_PASSWORD, authService.forgotPassword);
