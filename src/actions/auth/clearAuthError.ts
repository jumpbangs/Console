import { createAction } from 'redux-actions';

import { Action } from 'domain/base';

export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
export type CLEAR_AUTH_ERROR = typeof CLEAR_AUTH_ERROR;

export type ClearAuthError = Action<CLEAR_AUTH_ERROR>;

export const clearAuthError = createAction(CLEAR_AUTH_ERROR);
