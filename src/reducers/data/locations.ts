import AppActions from 'domain/actions/AppActions';
import LocationState from 'domain/states/data/Location';
import { updateLocationData } from 'updater/updateLocationsData';
import { SET_SELECTED_LOCATION } from 'actions/location/selectLocation';
import { UPDATE_LOCATION_FULFILLED } from 'actions/location/updateLocation';
import {
  FETCH_ALL_LOCATIONS_PENDING,
  FETCH_ALL_LOCATIONS_REJECTED,
  FETCH_ALL_LOCATIONS_FULFILLED,
} from 'actions/location/fetchAllLocations';

const INITIAL_STATE: LocationState = {
  locations: [],
  selectedLocationId: '',
};

/**
 * Location Data Reducer.
 *
 * @param {Location} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {Location}
 */
export default function (state: LocationState = INITIAL_STATE, action: AppActions): LocationState {
  switch (action.type) {
    case FETCH_ALL_LOCATIONS_FULFILLED:
      return {
        ...state,
        locations: action.payload,
      };

    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocationId: action.payload,
      };

    case FETCH_ALL_LOCATIONS_PENDING:
    case FETCH_ALL_LOCATIONS_REJECTED:
      return state;

    case UPDATE_LOCATION_FULFILLED:
      return updateLocationData(state, action.payload);

    default:
      return state;
  }
}
