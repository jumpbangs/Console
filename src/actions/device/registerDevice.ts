import { createAction } from 'redux-actions';

import * as deviceService from 'services/devices';
import { DeviceResponseData } from 'domain/response/Devices';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// REGISTER Device Action
export const REGISTER_NEW_DEVICE = 'REGISTER_NEW_DEVICE';
export type REGISTER_NEW_DEVICE_ = typeof REGISTER_NEW_DEVICE;

export const REGISTER_NEW_DEVICE_PENDING = 'REGISTER_NEW_DEVICE_PENDING';
export type REGISTER_NEW_DEVICE_PENDING = typeof REGISTER_NEW_DEVICE_PENDING;

export const REGISTER_NEW_DEVICE_REJECTED = 'REGISTER_NEW_DEVICE_REJECTED';
export type REGISTER_NEW_DEVICE_REJECTED = typeof REGISTER_NEW_DEVICE_REJECTED;

export const REGISTER_NEW_DEVICE_FULFILLED = 'REGISTER_NEW_DEVICE_FULFILLED';
export type REGISTER_NEW_DEVICE_FULFILLED = typeof REGISTER_NEW_DEVICE_FULFILLED;

// Types of Action
export type RegisterDevicePending = Action<REGISTER_NEW_DEVICE_PENDING>;
export type RegisterDeviceRejected = ActionWithError<REGISTER_NEW_DEVICE_REJECTED, any>;
export type RegisterDeviceFulfilled = ActionWithPayload<REGISTER_NEW_DEVICE_FULFILLED, DeviceResponseData>;

export type RegisterDeviceActions = RegisterDevicePending | RegisterDeviceRejected | RegisterDeviceFulfilled;

export const registerNewDevice = createAction(REGISTER_NEW_DEVICE, deviceService.registerDevice);
