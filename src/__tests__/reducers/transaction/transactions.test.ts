import AppActions from 'domain/actions/AppActions';
import { getTransactionDetails } from 'utils/testUtils';
import transactionReducer, { INITIAL_STATE } from 'reducers/data/transactions/transactions';
import {
  FETCH_TRANSACTION_PENDING,
  FETCH_TRANSACTION_REJECTED,
  FETCH_TRANSACTION_FULFILLED,
} from 'actions/transactions/fetchTransactions';

describe('REDUCERS: data/transaction', () => {
  it('Should return initial state or undefined', () => {
    expect(transactionReducer(undefined, { type: undefined } as any)).toEqual(INITIAL_STATE);
  });

  it('Should correctly reduce state for FETCH_TRANSACTION_FULFILLED action', () => {
    const transactionActionStats = getTransactionDetails();

    const action: AppActions = {
      meta: {},
      payload: transactionActionStats,
      type: FETCH_TRANSACTION_FULFILLED,
    };

    const expectedState = action.payload;

    expect(transactionReducer(undefined, action)).toEqual(expectedState);
  });

  it('Should correctly reduce state for FETCH_TRANSACTION_PENDING and FETCH_TRANSACTION_REJECTED action', () => {
    const pendingAction: AppActions = {
      meta: {},
      payload: [],
      type: FETCH_TRANSACTION_PENDING,
    };

    const rejectedAction: AppActions = {
      meta: {},
      payload: [],
      type: FETCH_TRANSACTION_REJECTED,
      error: true,
    };
    const expectedState = INITIAL_STATE;

    expect(transactionReducer(undefined, pendingAction)).toEqual(expectedState);

    expect(transactionReducer(undefined, rejectedAction)).toEqual(expectedState);
  });
});
