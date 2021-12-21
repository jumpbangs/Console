import AppActions from 'domain/actions/AppActions';
import { SET_TICKET_DETAILS } from 'actions/tickets/setTicketDetails';
import { TicketDetails as TicketDetailState } from 'domain/states/data/tickets/TicketDetails';

export const INITIAL_STATE: TicketDetailState = null;

/**
 * Ticket details Reducer.
 *
 * @param {TicketDetailState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {TicketDetailState}
 */
export default function (state: TicketDetailState = INITIAL_STATE, action: AppActions): TicketDetailState {
  switch (action.type) {
    case SET_TICKET_DETAILS:
      return action.payload;

    default:
      return state;
  }
}
