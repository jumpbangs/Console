import AppActions from 'domain/actions/AppActions';
import { RegisterDeviceResponse as DeviceRegisterState } from 'domain/states/data/devices/DeviceRegister';
import {
  REGISTER_NEW_DEVICE_PENDING,
  REGISTER_NEW_DEVICE_REJECTED,
  REGISTER_NEW_DEVICE_FULFILLED,
} from 'actions/device/registerDevice';

const INITIAL_STATE: DeviceRegisterState = [];

/**
 * Device Reducer.
 *
 * @param {DeviceState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {DeviceState}
 */
export default function (state: DeviceRegisterState = INITIAL_STATE, action: AppActions): DeviceRegisterState {
  switch (action.type) {
    case REGISTER_NEW_DEVICE_PENDING:
    case REGISTER_NEW_DEVICE_REJECTED:
      return state;

    case REGISTER_NEW_DEVICE_FULFILLED:
      return { ...action.payload, ...state };

    default:
      return state;
  }
}
