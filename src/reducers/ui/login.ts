import Auth from 'domain/states/ui/Auth';
import AppActions from 'domain/actions/AppActions';
import { CLEAR_AUTH_ERROR } from 'actions/auth/clearAuthError';
import { LOGIN_FULFILLED, LOGIN_PENDING, LOGIN_REJECTED } from 'actions/auth/login';
import { FORGOT_PASSWORD_PENDING, FORGOT_PASSWORD_REJECTED } from 'actions/auth/forgotPassword';
import {
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_REJECTED,
  CHANGE_PASSWORD_FULFILLED,
} from 'actions/auth/changePassword';
import {
  CREATE_PASSWORD_PENDING,
  CREATE_PASSWORD_REJECTED,
  CREATE_PASSWORD_FULFILLED,
} from 'actions/auth/createPassword';
import {
  FORGOT_PASSWORD_SUBMIT_PENDING,
  FORGOT_PASSWORD_SUBMIT_REJECTED,
  FORGOT_PASSWORD_SUBMIT_FULFILLED,
} from 'actions/auth/forgotPasswordSubmit';

const INITIAL_STATE: Auth = {
  isError: false,
  errorMessage: '',
  passwordChanged: false,
  newPasswordRequired: false,
};

/**
 * Auth Reducer.
 *
 * @param {Auth} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {Auth}
 */
export default function (state: Auth = INITIAL_STATE, action: AppActions): Auth {
  switch (action.type) {
    case LOGIN_PENDING:
    case CLEAR_AUTH_ERROR:
    case FORGOT_PASSWORD_PENDING:
    case CHANGE_PASSWORD_PENDING:
    case CREATE_PASSWORD_PENDING:
    case FORGOT_PASSWORD_SUBMIT_PENDING:
      return {
        ...state,
        isError: false,
        errorMessage: '',
        passwordChanged: false,
        newPasswordRequired: false,
      };

    case LOGIN_FULFILLED:
    case CREATE_PASSWORD_FULFILLED:
      return {
        ...state,
        newPasswordRequired: action.payload.newPasswordRequired,
      };

    case LOGIN_REJECTED:
    case FORGOT_PASSWORD_REJECTED:
    case CHANGE_PASSWORD_REJECTED:
    case CREATE_PASSWORD_REJECTED:
    case FORGOT_PASSWORD_SUBMIT_REJECTED:
      return {
        ...state,
        isError: action.error,
        passwordChanged: false,
        newPasswordRequired: false,
        errorMessage: action.payload.message,
      };

    case FORGOT_PASSWORD_SUBMIT_FULFILLED:
      return {
        ...state,
        passwordChanged: true,
      };

    case CHANGE_PASSWORD_FULFILLED:
      return state;

    default:
      return state;
  }
}
