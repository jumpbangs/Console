import { createAction } from 'redux-actions';

import { logout as logOut } from 'services/auth';
import { Action, ActionWithError } from 'domain/base';

export const LOGOUT = 'LOGOUT';
export type LOGOUT_ = typeof LOGOUT;

export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export type LOGOUT_PENDING = typeof LOGOUT_PENDING;

export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';
export type LOGOUT_REJECTED = typeof LOGOUT_REJECTED;

export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export type LOGOUT_FULFILLED = typeof LOGOUT_FULFILLED;

// Types for action.
export type LogoutPending = Action<LOGOUT_PENDING>;
export type LogoutRejected = ActionWithError<LOGOUT_REJECTED, any>;
export type LogoutFulfilled = Action<LOGOUT_FULFILLED>;

export type LogoutActions = LogoutPending | LogoutRejected | LogoutFulfilled;

// Action creators.
export const logout = createAction(LOGOUT, logOut);
