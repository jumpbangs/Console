import { getTicketDetail } from 'utils/testUtils';
import AppActions from 'domain/actions/AppActions';
import { SET_TICKET_DETAILS } from 'actions/tickets/setTicketDetails';
import ticketDetailReducer, { INITIAL_STATE } from 'reducers/data/tickets/ticketDetails';

describe('REDUCERS: data/transaction', () => {
  it('Should return initial state or undefined', () => {
    expect(ticketDetailReducer(undefined, { type: undefined } as any)).toEqual(INITIAL_STATE);
  });

  it('Should correctly reduce state for SET_TICKET_DETAILS action', () => {
    const ticketDetail = getTicketDetail();

    const action: AppActions = {
      meta: {},
      type: SET_TICKET_DETAILS,
      payload: ticketDetail,
    };

    const expectedState = action.payload;

    expect(ticketDetailReducer(undefined, action)).toEqual(expectedState);
  });
});
