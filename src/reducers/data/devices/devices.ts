import AppActions from 'domain/actions/AppActions';
import { Devices as DeviceState } from 'domain/states/data/devices/Devices';
import {
  FETCH_ALL_DEVICES_PENDING,
  FETCH_ALL_DEVICES_REJECTED,
  FETCH_ALL_DEVICES_FULFILLED,
} from 'actions/device/fetchAllDevices';
import {
  REGISTER_NEW_DEVICE_PENDING,
  REGISTER_NEW_DEVICE_REJECTED,
  REGISTER_NEW_DEVICE_FULFILLED,
} from 'actions/device/registerDevice';

export const INITIAL_STATE: DeviceState = {
  data: [],
  has_more: false,
};

/**
 * Device Reducer.
 *
 * @param {DeviceState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {DeviceState}
 */
export default function (state: DeviceState = INITIAL_STATE, action: AppActions): DeviceState {
  switch (action.type) {
    case FETCH_ALL_DEVICES_FULFILLED:
      return action.payload;

    case REGISTER_NEW_DEVICE_FULFILLED:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };

    case REGISTER_NEW_DEVICE_PENDING:
    case REGISTER_NEW_DEVICE_REJECTED:
    case FETCH_ALL_DEVICES_PENDING:
    case FETCH_ALL_DEVICES_REJECTED:
      return state;

    default:
      return state;
  }
}
