import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';
import { DeviceResponseData } from 'domain/response/Devices';

export const SET_DEVICE_DETAILS = 'SET_DEVICE_DETAILS';
export type SET_DEVICE_DETAILS = typeof SET_DEVICE_DETAILS;

export type SetDeviceDetailsActions = ActionWithPayload<SET_DEVICE_DETAILS, DeviceResponseData>;

export const setDeviceDetails = createAction(SET_DEVICE_DETAILS);
