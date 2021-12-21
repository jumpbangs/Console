import AppActions from 'domain/actions/AppActions';
import { Tickets as TicketsState } from 'domain/states/data/tickets/Tickets';
import { FETCH_TICKETS_FULFILLED, FETCH_TICKETS_PENDING, FETCH_TICKETS_REJECTED } from 'actions/tickets/fetchTickets';

export const INITIAL_STATE: TicketsState = {
  data: [],
  has_more: false,
};

/**
 * Ticket Reducer.
 *
 * @param {TicketsState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TicketsState}
 */
export default function (state: TicketsState = INITIAL_STATE, action: AppActions): TicketsState {
  switch (action.type) {
    case FETCH_TICKETS_FULFILLED:
      return action.payload;

    case FETCH_TICKETS_PENDING:
    case FETCH_TICKETS_REJECTED:
      return state;

    default:
      return state;
  }
}
