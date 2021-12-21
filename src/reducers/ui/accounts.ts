import AppActions from 'domain/actions/AppActions';
import AccountState from 'domain/states/ui/Account';
import {
  UPDATE_ACCOUNT_PENDING,
  UPDATE_ACCOUNT_REJECTED,
  UPDATE_ACCOUNT_FULFILLED,
} from 'actions/account/updateAccount';

const INITIAL_STATE: AccountState = {
  isError: false,
  errorMessage: '',
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
    case UPDATE_ACCOUNT_PENDING:
    case UPDATE_ACCOUNT_FULFILLED:
      return {
        ...state,
        isError: false,
        errorMessage: '',
      };

    case UPDATE_ACCOUNT_REJECTED:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
}
