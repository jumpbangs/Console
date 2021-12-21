import { createAction } from 'redux-actions';

import * as deviceService from 'services/devices';
import { DevicesResponseData } from 'domain/response/Devices';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Return a list of devices.
export const FETCH_ALL_DEVICES = 'FETCH_ALL_DEVICES';
export type FETCH_ALL_DEVICES_ = typeof FETCH_ALL_DEVICES;

export const FETCH_ALL_DEVICES_PENDING = 'FETCH_ALL_DEVICES_PENDING';
export type FETCH_ALL_DEVICES_PENDING = typeof FETCH_ALL_DEVICES_PENDING;

export const FETCH_ALL_DEVICES_REJECTED = 'FETCH_ALL_DEVICES_REJECTED';
export type FETCH_ALL_DEVICES_REJECTED = typeof FETCH_ALL_DEVICES_REJECTED;

export const FETCH_ALL_DEVICES_FULFILLED = 'FETCH_ALL_DEVICES_FULFILLED';
export type FETCH_ALL_DEVICES_FULFILLED = typeof FETCH_ALL_DEVICES_FULFILLED;

export type FetchAllDevicesPending = Action<FETCH_ALL_DEVICES_PENDING>;
export type FetchAllDevicesRejected = ActionWithError<FETCH_ALL_DEVICES_REJECTED, any>;
export type FetchAllDevicesFulfilled = ActionWithPayload<FETCH_ALL_DEVICES_FULFILLED, DevicesResponseData>;

export type FetchAllDeviceActions = FetchAllDevicesPending | FetchAllDevicesRejected | FetchAllDevicesFulfilled;

export const fetchAllDevices = createAction(FETCH_ALL_DEVICES, deviceService.fetchAllDevices);
