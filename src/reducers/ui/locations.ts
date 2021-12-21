import AppActions from 'domain/actions/AppActions';
import LocationState from 'domain/states/ui/Location';
import {
  UPDATE_LOCATION_PENDING,
  UPDATE_LOCATION_REJECTED,
  UPDATE_LOCATION_FULFILLED,
} from 'actions/location/updateLocation';

const INITIAL_STATE: LocationState = {
  isError: false,
  errorMessage: '',
};

/**
 * Location UI Reducer.
 *
 * @param {Location} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {Location}
 */
export default function (state: LocationState = INITIAL_STATE, action: AppActions): LocationState {
  switch (action.type) {
    case UPDATE_LOCATION_PENDING:
    case UPDATE_LOCATION_FULFILLED:
      return {
        ...state,
        isError: false,
        errorMessage: '',
      };

    case UPDATE_LOCATION_REJECTED:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
}
