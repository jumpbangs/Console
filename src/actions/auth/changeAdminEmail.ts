import { createAction } from 'redux-actions';

import * as authService from 'services/auth';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';
import { UpdateEmailConfirmResponse, UpdateEmailResponse } from 'domain/response/Auth';

export const CHANGE_ADMIN_EMAIL = 'CHANGE_ADMIN_EMAIL';
export type CHANGE_ADMIN_EMAIL_ = typeof CHANGE_ADMIN_EMAIL;

export const CHANGE_ADMIN_EMAIL_PENDING = 'CHANGE_ADMIN_EMAIL_PENDING';
export type CHANGE_ADMIN_EMAIL_PENDING = typeof CHANGE_ADMIN_EMAIL_PENDING;

export const CHANGE_ADMIN_EMAIL_REJECTED = 'CHANGE_ADMIN_EMAIL_REJECTED';
export type CHANGE_ADMIN_EMAIL_REJECTED = typeof CHANGE_ADMIN_EMAIL_REJECTED;

export const CHANGE_ADMIN_EMAIL_FULFILLED = 'CHANGE_ADMIN_EMAIL_FULFILLED';
export type CHANGE_ADMIN_EMAIL_FULFILLED = typeof CHANGE_ADMIN_EMAIL_FULFILLED;

export const SUBMIT_EMAIL_VALIDATION_CODE = 'SUBMIT_EMAIL_VALIDATION_CODE';
export type SUBMIT_EMAIL_VALIDATION_CODE_ = typeof SUBMIT_EMAIL_VALIDATION_CODE;

export const SUBMIT_EMAIL_VALIDATION_CODE_PENDING = 'SUBMIT_EMAIL_VALIDATION_CODE_PENDING';
export type SUBMIT_EMAIL_VALIDATION_CODE_PENDING = typeof SUBMIT_EMAIL_VALIDATION_CODE_PENDING;

export const SUBMIT_EMAIL_VALIDATION_CODE_REJECTED = 'SUBMIT_EMAIL_VALIDATION_CODE_REJECTED';
export type SUBMIT_EMAIL_VALIDATION_CODE_REJECTED = typeof SUBMIT_EMAIL_VALIDATION_CODE_REJECTED;

export const SUBMIT_EMAIL_VALIDATION_CODE_FULFILLED = 'SUBMIT_EMAIL_VALIDATION_CODE_FULFILLED';
export type SUBMIT_EMAIL_VALIDATION_CODE_FULFILLED = typeof SUBMIT_EMAIL_VALIDATION_CODE_FULFILLED;

// Types for action.
export type ChangeAdminEmailPending = Action<CHANGE_ADMIN_EMAIL_PENDING>;
export type ChangeAdminEmailRejected = ActionWithError<CHANGE_ADMIN_EMAIL_REJECTED, any>;
export type ChangeAdminEmailFulfilled = ActionWithPayload<CHANGE_ADMIN_EMAIL_FULFILLED, UpdateEmailResponse>;

export type ChangeAdminEmailActions = ChangeAdminEmailFulfilled | ChangeAdminEmailPending | ChangeAdminEmailRejected;

export type SubmitEmailValidationCodePending = Action<SUBMIT_EMAIL_VALIDATION_CODE_PENDING>;
export type SubmitEmailValidationCodeRejected = ActionWithError<SUBMIT_EMAIL_VALIDATION_CODE_REJECTED, any>;
export type SubmitEmailValidationCodeFulfilled = ActionWithPayload<
  SUBMIT_EMAIL_VALIDATION_CODE_FULFILLED,
  UpdateEmailConfirmResponse
>;

export type SubmitEmailValidationCodeActions =
  | SubmitEmailValidationCodePending
  | SubmitEmailValidationCodeFulfilled
  | SubmitEmailValidationCodeRejected;

export type ChangeEmailActions = ChangeAdminEmailActions | SubmitEmailValidationCodeActions;

// Action creators.
export const changeAdminEmail = createAction(CHANGE_ADMIN_EMAIL, authService.changeAdminEmail);
export const submitEmailValidationCode = createAction(
  SUBMIT_EMAIL_VALIDATION_CODE,
  authService.submitEmailValidationCode
);
