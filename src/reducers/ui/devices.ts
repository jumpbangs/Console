import Device from 'domain/states/ui/Device';
import AppActions from 'domain/actions/AppActions';
import {
  FETCH_ALL_DEVICES_PENDING,
  FETCH_ALL_DEVICES_REJECTED,
  FETCH_ALL_DEVICES_FULFILLED,
} from 'actions/device/fetchAllDevices';
import { SET_DEVICE_DETAIL_MODAL_STATUS, SET_DEVICE_REGISTRATION_MODAL_STATUS } from 'actions/device/device';

const INITIAL_STATE: Device = {
  isFetchingDevices: false,
  isDeviceDetailModalActive: false,
  isDeviceRegistrationModalActive: false,
};

/**
 * Device UI Reducer.
 *
 * @param {DeviceState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {DeviceState}
 */
export default function (state: Device = INITIAL_STATE, action: AppActions): Device {
  switch (action.type) {
    case FETCH_ALL_DEVICES_FULFILLED:
    case FETCH_ALL_DEVICES_REJECTED:
      return {
        ...state,
        isFetchingDevices: false,
      };

    case FETCH_ALL_DEVICES_PENDING:
      return {
        ...state,
        isFetchingDevices: true,
      };

    case SET_DEVICE_DETAIL_MODAL_STATUS:
      return {
        ...state,
        isDeviceDetailModalActive: action.payload,
      };

    case SET_DEVICE_REGISTRATION_MODAL_STATUS:
      return {
        ...state,
        isDeviceRegistrationModalActive: action.payload,
      };

    default:
      return state;
  }
}
