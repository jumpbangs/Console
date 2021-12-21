import AppActions from 'domain/actions/AppActions';
import { TopLocations as TopLocationState } from 'domain/states/data/home/TopLocations';
import {
  FETCH_TOP_LOCATIONS_PENDING,
  FETCH_TOP_LOCATIONS_REJECTED,
  FETCH_TOP_LOCATIONS_FULFILLED,
} from 'actions/home/fetchTopLocations';

const INITIAL_STATE: TopLocationState = [];

/**
 * Top location Data Reducer.
 *
 * @param {TopLocationState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TopLocationState}
 */
export default function (state: TopLocationState = INITIAL_STATE, action: AppActions): TopLocationState {
  switch (action.type) {
    case FETCH_TOP_LOCATIONS_FULFILLED:
      return action.payload;

    case FETCH_TOP_LOCATIONS_PENDING:
    case FETCH_TOP_LOCATIONS_REJECTED:
      return state;

    default:
      return state;
  }
}
