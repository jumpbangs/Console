import { combineReducers } from 'redux';

import data from './homeData';
import chartFilters from './chartFilter';
import topLocations from './topLocationData';

export default combineReducers({
  data,
  chartFilters,
  topLocations,
});
