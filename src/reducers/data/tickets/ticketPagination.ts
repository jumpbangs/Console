import AppActions from 'domain/actions/AppActions';
import { SET_TICKET_PAGINATION_OPTION } from 'actions/tickets/ticketPagination';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_COUNTER_COUNT } from 'constants/appConstants';
import { TicketPagination as TicketPaginationState } from 'domain/states/data/tickets/TicketPagination';

const INITIAL_STATE: TicketPaginationState = {
  ending_before: '',
  starting_after: '',
  counter: DEFAULT_COUNTER_COUNT,
  limit: DEFAULT_PAGINATION_LIMIT,
};

/**
 * Ticket Pagination Data Reducer.
 *
 * @param {TicketPaginationState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TicketPaginationState}
 */
export default function (state: TicketPaginationState = INITIAL_STATE, action: AppActions): TicketPaginationState {
  switch (action.type) {
    case SET_TICKET_PAGINATION_OPTION:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
