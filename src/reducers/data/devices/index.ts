import { combineReducers } from 'redux';

import devices from './devices';
import deviceDetails from './deviceDetails';
import registerDetails from './registerDevice';
import devicePagination from './devicePagination';

export default combineReducers({
  devices,
  deviceDetails,
  devicePagination,
  registerDetails,
});
