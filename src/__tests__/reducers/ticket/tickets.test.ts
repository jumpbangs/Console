import AppActions from 'domain/actions/AppActions';
import { getTicketDetails } from 'utils/testUtils';
import ticketReducer, { INITIAL_STATE } from 'reducers/data/tickets/tickets';
import { FETCH_TICKETS_PENDING, FETCH_TICKETS_REJECTED, FETCH_TICKETS_FULFILLED } from 'actions/tickets/fetchTickets';

describe('REDUCERS: data/transaction', () => {
  it('Should return initial state or undefined', () => {
    expect(ticketReducer(undefined, { type: undefined } as any)).toEqual(INITIAL_STATE);
  });

  it('Should correctly reduce state for FETCH_TICKETS_FULFILLED action', () => {
    const ticketDetails = getTicketDetails();

    const action: AppActions = {
      meta: {},
      type: FETCH_TICKETS_FULFILLED,
      payload: ticketDetails,
    };

    const expectedState = action.payload;

    expect(ticketReducer(undefined, action)).toEqual(expectedState);
  });

  it('Should correctly reduce state for FETCH_TICKETS_PENDING and FETCH_TICKETS_REJECTED action', () => {
    const pendingAction: AppActions = {
      meta: {},
      payload: INITIAL_STATE,
      type: FETCH_TICKETS_PENDING,
    };

    const rejectedAction: AppActions = {
      meta: {},
      payload: INITIAL_STATE,
      type: FETCH_TICKETS_REJECTED,
      error: true,
    };
    const expectedState = INITIAL_STATE;

    expect(ticketReducer(undefined, pendingAction)).toEqual(expectedState);

    expect(ticketReducer(undefined, rejectedAction)).toEqual(expectedState);
  });
});
