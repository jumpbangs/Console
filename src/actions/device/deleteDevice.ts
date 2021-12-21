import { createAction } from 'redux-actions';

import * as deviceService from 'services/devices';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Delete a device
export const DELETE_DEVICE = 'DELETE_DEVICE';
export type DELETE_DEVICE_ = typeof DELETE_DEVICE;

export const DELETE_DEVICE_PENDING = 'DELETE_DEVICE_PENDING';
export type DELETE_DEVICE_PENDING = typeof DELETE_DEVICE_PENDING;

export const DELETE_DEVICE_REJECTED = 'DELETE_DEVICE_REJECTED';
export type DELETE_DEVICE_REJECTED = typeof DELETE_DEVICE_REJECTED;

export const DELETE_DEVICE_FULFILLED = 'DELETE_DEVICE_FULFILLED';
export type DELETE_DEVICE_FULFILLED = typeof DELETE_DEVICE_FULFILLED;

export type DeleteDevicePending = Action<DELETE_DEVICE_PENDING>;
export type DeleteDeviceRejected = ActionWithError<DELETE_DEVICE_REJECTED, any>;
export type DeleteDeviceFulfilled = ActionWithPayload<DELETE_DEVICE_FULFILLED, any>;

export type DeleteDeviceActions = DeleteDevicePending | DeleteDeviceRejected | DeleteDeviceFulfilled;

export const deleteDevice = createAction(DELETE_DEVICE, deviceService.deleteDevice);
