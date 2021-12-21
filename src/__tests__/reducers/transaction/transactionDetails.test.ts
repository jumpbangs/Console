import AppActions from 'domain/actions/AppActions';
import { getTransactionDetail } from 'utils/testUtils';
import { SET_TRANSACTION_DETAILS } from 'actions/transactions/setTransactionDetails';
import transactionDetailReducer, { INITIAL_STATE } from 'reducers/data/transactions/transactionDetails';

describe('REDUCERS: data/transaction', () => {
  it('Should return initial state or undefined', () => {
    expect(transactionDetailReducer(undefined, { type: undefined } as any)).toEqual(INITIAL_STATE);
  });

  it('Should correctly reduce state for SET_TRANSACTION_DETAILS action', () => {
    const transactionDetail = getTransactionDetail();

    const action: AppActions = {
      meta: {},
      type: SET_TRANSACTION_DETAILS,
      payload: transactionDetail,
    };

    const expectedState = action.payload;

    expect(transactionDetailReducer(undefined, action)).toEqual(expectedState);
  });
});
