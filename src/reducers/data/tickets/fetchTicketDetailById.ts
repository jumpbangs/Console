import AppActions from 'domain/actions/AppActions';
import { FetchTicketDetailById as FetchTicketDetailState } from 'domain/states/data/tickets/FetchTicketDetailById';
import {
  FETCH_TICKET_BY_ID_PENDING,
  FETCH_TICKET_BY_ID_REJECTED,
  FETCH_TICKET_BY_ID_FULFILLED,
} from 'actions/tickets/fetchTicketById';

export const INITIAL_STATE: FetchTicketDetailState = null;

/**
 * Ticket details Reducer.
 *
 * @param {TicketDetailState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TicketDetailState}
 */
export default function (state: FetchTicketDetailState = INITIAL_STATE, action: AppActions): FetchTicketDetailState {
  switch (action.type) {
    case FETCH_TICKET_BY_ID_FULFILLED:
      return action.payload;

    case FETCH_TICKET_BY_ID_PENDING:
    case FETCH_TICKET_BY_ID_REJECTED:
      return state;

    default:
      return state;
  }
}
