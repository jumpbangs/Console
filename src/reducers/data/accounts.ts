import AppActions from 'domain/actions/AppActions';
import AccountState from 'domain/states/data/Account';
import {
  FETCH_ACCOUNT_BY_ID_PENDING,
  FETCH_ACCOUNT_BY_ID_REJECTED,
  FETCH_ACCOUNT_BY_ID_FULFILLED,
} from 'actions/account/fetchAccountById';

import {
  UPDATE_ACCOUNT_PENDING,
  UPDATE_ACCOUNT_REJECTED,
  UPDATE_ACCOUNT_FULFILLED,
} from 'actions/account/updateAccount';

const INITIAL_STATE: AccountState = {
  account: {
    id: '',
    name: '',
    phone: '',
    object: '',
    address: {
      city: '',
      state: '',
      line1: '',
      line2: '',
      country: '',
      postal_code: '',
    },
    website: '',
    metadata: {},
  },
};

/**
 * Accounts reducer.
 *
 * @param {AccountState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {AccountState}
 */
export default function (state: AccountState = INITIAL_STATE, action: AppActions): AccountState {
  switch (action.type) {
    case UPDATE_ACCOUNT_FULFILLED:
    case FETCH_ACCOUNT_BY_ID_FULFILLED:
      return {
        ...state,
        account: action.payload,
      };

    case UPDATE_ACCOUNT_PENDING:
    case UPDATE_ACCOUNT_REJECTED:
    case FETCH_ACCOUNT_BY_ID_PENDING:
    case FETCH_ACCOUNT_BY_ID_REJECTED:
      return state;

    default:
      return state;
  }
}
