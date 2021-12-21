import { createAction } from 'redux-actions';

import * as authService from 'services/auth';

import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FORGOT_PASSWORD_SUBMIT = 'FORGOT_PASSWORD_SUBMIT';
export type FORGOT_PASSWORD_SUBMIT_ = typeof FORGOT_PASSWORD_SUBMIT;

export const FORGOT_PASSWORD_SUBMIT_PENDING = 'FORGOT_PASSWORD_SUBMIT_PENDING';
export type FORGOT_PASSWORD_SUBMIT_PENDING = typeof FORGOT_PASSWORD_SUBMIT_PENDING;

export const FORGOT_PASSWORD_SUBMIT_REJECTED = 'FORGOT_PASSWORD_SUBMIT_REJECTED';
export type FORGOT_PASSWORD_SUBMIT_REJECTED = typeof FORGOT_PASSWORD_SUBMIT_REJECTED;

export const FORGOT_PASSWORD_SUBMIT_FULFILLED = 'FORGOT_PASSWORD_SUBMIT_FULFILLED';
export type FORGOT_PASSWORD_SUBMIT_FULFILLED = typeof FORGOT_PASSWORD_SUBMIT_FULFILLED;

// Types for action.
export type ForgotPasswordSubmitPending = Action<FORGOT_PASSWORD_SUBMIT_PENDING>;
export type ForgotPasswordSubmitRejected = ActionWithError<FORGOT_PASSWORD_SUBMIT_REJECTED, any>;
export type ForgotPasswordSubmitFulfilled = ActionWithPayload<FORGOT_PASSWORD_SUBMIT_FULFILLED, any>;

export type ForgotPasswordSubmitActions =
  | ForgotPasswordSubmitPending
  | ForgotPasswordSubmitRejected
  | ForgotPasswordSubmitFulfilled;

// Action creators.
export const forgotPasswordSubmit = createAction(FORGOT_PASSWORD_SUBMIT, authService.forgotPasswordSubmit);
