import AppActions from 'domain/actions/AppActions';
import { SET_DEVICE_DETAILS } from 'actions/device/deviceDetails';
import { DeviceDetails as DeviceDetailsState } from 'domain/states/data/devices/DeviceDetails';

export const INITIAL_STATE: DeviceDetailsState = null;

/**
 * Device Details Reducer.
 *
 * @param {DeviceDetailsState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {DeviceFilterState}
 */
export default function (state: DeviceDetailsState = INITIAL_STATE, action: AppActions): DeviceDetailsState {
  switch (action.type) {
    case SET_DEVICE_DETAILS:
      return action.payload;

    default:
      return state;
  }
}
