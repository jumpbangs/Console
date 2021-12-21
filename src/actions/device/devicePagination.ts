import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';
import { DevicePaginationOptions } from 'domain/request/Pagination';

export const SET_DEVICE_PAGINATION_OPTION = 'SET_DEVICE_PAGINATION_OPTION';
export type SET_DEVICE_PAGINATION_OPTION = typeof SET_DEVICE_PAGINATION_OPTION;

export type SetDevicePaginationActions = ActionWithPayload<SET_DEVICE_PAGINATION_OPTION, DevicePaginationOptions>;

// Action creators.
export const setDevicePagination = createAction(SET_DEVICE_PAGINATION_OPTION);
