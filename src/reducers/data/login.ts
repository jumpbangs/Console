import Auth from 'domain/states/data/Auth';
import AppActions from 'domain/actions/AppActions';
import { FORGOT_PASSWORD_FULFILLED } from 'actions/auth/forgotPassword';
import { LOGIN_FULFILLED, LOGIN_PENDING, LOGIN_REJECTED } from 'actions/auth/login';
import {
  CHANGE_ADMIN_NAME_PENDING,
  CHANGE_ADMIN_NAME_REJECTED,
  CHANGE_ADMIN_NAME_FULFILLED,
} from 'actions/auth/changeAdminName';
import {
  CHANGE_ADMIN_EMAIL_PENDING,
  CHANGE_ADMIN_EMAIL_REJECTED,
  CHANGE_ADMIN_EMAIL_FULFILLED,
  SUBMIT_EMAIL_VALIDATION_CODE_PENDING,
  SUBMIT_EMAIL_VALIDATION_CODE_REJECTED,
  SUBMIT_EMAIL_VALIDATION_CODE_FULFILLED,
} from 'actions/auth/changeAdminEmail';
import {
  CREATE_PASSWORD_PENDING,
  CREATE_PASSWORD_REJECTED,
  CREATE_PASSWORD_FULFILLED,
} from 'actions/auth/createPassword';

const INITIAL_STATE: Auth = {
  userInfo: {
    name: '',
    email: '',
    emailVerified: true,
  },
  idToken: '',
  awsUserDump: {},
  accessToken: '',
  refreshToken: '',
};

// TODO: refactor
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
    case CREATE_PASSWORD_PENDING:
      return state;

    case CREATE_PASSWORD_FULFILLED: {
      return {
        ...state,
        awsUserDump: action.payload.awsUserDump,
        userInfo: {
          ...state.userInfo,
          name: action.payload.userInfo.name,
          email: action.payload.userInfo.email,
          emailVerified: action.payload.userInfo.emailVerified,
        },
        idToken: action.payload.idToken,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }

    case LOGIN_FULFILLED:
      return {
        ...state,
        awsUserDump: action.payload.awsUserDump,
        userInfo: {
          ...state.userInfo,
          name: action.payload.userInfo.name,
          email: action.payload.userInfo.email,
          emailVerified: action.payload.userInfo.emailVerified,
        },
        idToken: action.payload.idToken,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    case 'REFRESH_AWS_TOKENS':
      return {
        ...state,
        idToken: action.payload.idToken,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    case CHANGE_ADMIN_NAME_FULFILLED:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          name: action.payload,
        },
      };

    case CHANGE_ADMIN_EMAIL_FULFILLED:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          email: action.payload.email,
          emailVerified: action.payload.emailVerified,
        },
      };

    case SUBMIT_EMAIL_VALIDATION_CODE_FULFILLED:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          emailVerified: action.payload.emailVerified,
        },
      };

    case LOGIN_REJECTED:
    case CREATE_PASSWORD_REJECTED:
    case CHANGE_ADMIN_NAME_PENDING:
    case CHANGE_ADMIN_NAME_REJECTED:
    case CHANGE_ADMIN_EMAIL_PENDING:
    case CHANGE_ADMIN_EMAIL_REJECTED:
    case SUBMIT_EMAIL_VALIDATION_CODE_PENDING:
    case SUBMIT_EMAIL_VALIDATION_CODE_REJECTED:
      return state;

    case FORGOT_PASSWORD_FULFILLED:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          email: action.payload,
        },
      };
    default:
      return state;
  }
}
