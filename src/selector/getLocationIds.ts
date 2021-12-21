import AppState from 'domain/states/AppState';
import FormattedLocations from 'domain/misc/home/TopLocation';

/**
 * Filter and get only location ids from location data.
 *
 * @param {AppState} state
 *
 * @returns {FormattedLocations[]}
 */
export const getLocationIds = (state: AppState): FormattedLocations[] => {
  const locations = state.data.locations.locations;

  if (!locations.length) {
    return [];
  }

  return locations.map((location) => {
    return {
      locId: location.id,
      displayName: location.display_name || '',
    };
  });
};
