import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';

export const REFRESH_AWS_TOKENS = 'REFRESH_AWS_TOKENS';
export type REFRESH_AWS_TOKENS = typeof REFRESH_AWS_TOKENS;

// Types for action.
export type RefreshAWSTokens = ActionWithPayload<REFRESH_AWS_TOKENS, any>;

// Action creators.
export const refreshAWSTokens = createAction(REFRESH_AWS_TOKENS);
