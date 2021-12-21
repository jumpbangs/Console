import { combineReducers } from 'redux';

import tickets from './tickets';
import ticketDetails from './ticketDetails';
import ticketPagination from './ticketPagination';
import ticketDetailById from './fetchTicketDetailById';

/**
 * Combine tickets data reducers.
 */
export default combineReducers({
  tickets,
  ticketDetails,
  ticketPagination,
  ticketDetailById,
});
