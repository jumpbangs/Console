import LocationResponse from 'domain/response/Location';
import LocationState from 'domain/states/data/Location';

/**
 * Update location data.
 *
 * @param {LocationState} state
 * @param {LocationResponse} location
 *
 * @returns {LocationState}
 */
export const updateLocationData = (state: LocationState, location: LocationResponse): LocationState => {
  return {
    ...state,
    locations: state.locations.map((value) => (value.id === location.id ? location : value)),
  };
};
