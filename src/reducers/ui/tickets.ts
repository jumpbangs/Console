import AppActions from 'domain/actions/AppActions';
import TicketsState from 'domain/states/ui/Tickets';
import { SET_TICKET_MODAL_STATUS } from 'actions/tickets/tickets';
import { FETCH_TICKETS_FULFILLED, FETCH_TICKETS_PENDING, FETCH_TICKETS_REJECTED } from 'actions/tickets/fetchTickets';

const INITIAL_STATE: TicketsState = {
  isFetchingTickets: false,
  isTicketModalActive: false,
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
    case FETCH_TICKETS_PENDING:
      return {
        ...state,
        isFetchingTickets: true,
      };

    case SET_TICKET_MODAL_STATUS:
      return {
        ...state,
        isTicketModalActive: action.payload,
      };

    case FETCH_TICKETS_REJECTED:
    case FETCH_TICKETS_FULFILLED:
      return {
        ...state,
        isFetchingTickets: false,
      };

    default:
      return state;
  }
}
