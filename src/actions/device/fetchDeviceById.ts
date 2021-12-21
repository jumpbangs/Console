import { createAction } from 'redux-actions';

import * as deviceService from 'services/devices';
import { DeviceResponseData } from 'domain/response/Devices';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Fetch device id.
export const FETCH_DEVICE_BY_ID = 'FETCH_DEVICE_BY_ID';
export type FETCH_DEVICE_BY_ID_ = typeof FETCH_DEVICE_BY_ID;

export const FETCH_DEVICE_BY_ID_PENDING = 'FETCH_DEVICE_BY_ID_PENDING';
export type FETCH_DEVICE_BY_ID_PENDING = typeof FETCH_DEVICE_BY_ID_PENDING;

export const FETCH_DEVICE_BY_ID_REJECTED = 'FETCH_DEVICE_BY_ID_REJECTED';
export type FETCH_DEVICE_BY_ID_REJECTED = typeof FETCH_DEVICE_BY_ID_REJECTED;

export const FETCH_DEVICE_BY_ID_FULFILLED = 'FETCH_DEVICE_BY_ID_FULFILLED';
export type FETCH_DEVICE_BY_ID_FULFILLED = typeof FETCH_DEVICE_BY_ID_FULFILLED;

export type FetchDeviceByIdPending = Action<FETCH_DEVICE_BY_ID_PENDING>;
export type FetchDeviceByIdRejected = ActionWithError<FETCH_DEVICE_BY_ID_REJECTED, any>;
export type FetchDeviceByIdFulfilled = ActionWithPayload<FETCH_DEVICE_BY_ID_FULFILLED, DeviceResponseData>;

export type FetchDeviceByIdActions = FetchDeviceByIdPending | FetchDeviceByIdRejected | FetchDeviceByIdFulfilled;

// Action Creator
export const fetchDeviceById = createAction(FETCH_DEVICE_BY_ID, deviceService.fetchDeviceById);
