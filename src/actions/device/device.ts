import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';

export const SET_DEVICE_DETAIL_MODAL_STATUS = 'SET_DEVICE_DETAIL_MODAL_STATUS';
export type SET_DEVICE_DETAIL_MODAL_STATUS = typeof SET_DEVICE_DETAIL_MODAL_STATUS;

export const SET_DEVICE_REGISTRATION_MODAL_STATUS = 'SET_DEVICE_REGISTRATION_MODAL_STATUS';
export type SET_DEVICE_REGISTRATION_MODAL_STATUS = typeof SET_DEVICE_REGISTRATION_MODAL_STATUS;

export type SetDeviceDetailModalStatus = ActionWithPayload<SET_DEVICE_DETAIL_MODAL_STATUS, boolean>;
export type SetDeviceRegistrationModalStatus = ActionWithPayload<SET_DEVICE_REGISTRATION_MODAL_STATUS, boolean>;

export type DeviceModalActions = SetDeviceDetailModalStatus | SetDeviceRegistrationModalStatus;

// Action Creators
export const setDeviceDetailModalStatus = createAction(SET_DEVICE_DETAIL_MODAL_STATUS);
export const setDeviceRegistrationModalStatus = createAction(SET_DEVICE_REGISTRATION_MODAL_STATUS);
