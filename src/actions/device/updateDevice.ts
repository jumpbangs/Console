import { createAction } from 'redux-actions';

import * as deviceService from 'services/devices';
import { DeviceResponseData } from 'domain/response/Devices';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export type UPDATE_DEVICE_ = typeof UPDATE_DEVICE;

export const UPDATE_DEVICE_PENDING = 'UPDATE_DEVICE_PENDING';
export type UPDATE_DEVICE_PENDING = typeof UPDATE_DEVICE_PENDING;

export const UPDATE_DEVICE_REJECTED = 'UPDATE_DEVICE_REJECTED';
export type UPDATE_DEVICE_REJECTED = typeof UPDATE_DEVICE_REJECTED;

export const UPDATE_DEVICE_FULFILLED = 'UPDATE_DEVICE_FULFILLED';
export type UPDATE_DEVICE_FULFILLED = typeof UPDATE_DEVICE_FULFILLED;

export type UpdateDevicePending = Action<UPDATE_DEVICE_PENDING>;
export type UpdateDeviceRejected = ActionWithError<UPDATE_DEVICE_REJECTED, any>;
export type UpdateDeviceFulfilled = ActionWithPayload<UPDATE_DEVICE_FULFILLED, DeviceResponseData>;

export type UpdateDeviceActions = UpdateDevicePending | UpdateDeviceRejected | UpdateDeviceFulfilled;

export const updateDevice = createAction(UPDATE_DEVICE, deviceService.updateDevice);
