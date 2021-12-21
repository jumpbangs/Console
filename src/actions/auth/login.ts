import { createAction } from 'redux-actions';

import * as loginService from 'services/auth';
import { AuthResponse } from 'domain/response/Auth';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const LOGIN = 'LOGIN';
export type LOGIN_ = typeof LOGIN;

export const LOGIN_PENDING = 'LOGIN_PENDING';
export type LOGIN_PENDING = typeof LOGIN_PENDING;

export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export type LOGIN_REJECTED = typeof LOGIN_REJECTED;

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export type LOGIN_FULFILLED = typeof LOGIN_FULFILLED;

// Types for action.
export type LoginPending = Action<LOGIN_PENDING>;
export type LoginRejected = ActionWithError<LOGIN_REJECTED, any>;
export type LoginFulfilled = ActionWithPayload<LOGIN_FULFILLED, AuthResponse>;

export type LoginActions = LoginPending | LoginRejected | LoginFulfilled;

// Action creators.
export const login = createAction(LOGIN, loginService.loginUser);
