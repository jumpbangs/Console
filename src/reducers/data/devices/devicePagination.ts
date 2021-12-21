import AppActions from 'domain/actions/AppActions';
import { SET_DEVICE_PAGINATION_OPTION } from 'actions/device/devicePagination';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_COUNTER_COUNT } from 'constants/appConstants';
import { DevicePagination as DevicePaginationState } from 'domain/states/data/devices/DevicePagination';

const INITIAL_STATE: DevicePaginationState = {
  status: '',
  device_type: '',
  ending_before: '',
  starting_after: '',
  counter: DEFAULT_COUNTER_COUNT,
  limit: DEFAULT_PAGINATION_LIMIT,
};

/**
 * Device Pagination Reducer.
 *
 * @param {DevicePaginationState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {DevicePaginationState}
 */
export default function (state: DevicePaginationState = INITIAL_STATE, action: AppActions): DevicePaginationState {
  switch (action.type) {
    case SET_DEVICE_PAGINATION_OPTION:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
